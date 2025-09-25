// Admin authentication utilities with localStorage persistence

const AUTH_KEY = 'admin_auth_token';
const AUTH_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface AuthData {
  timestamp: number;
  isAuthenticated: boolean;
}

export const adminAuth = {
  // Check if user is currently authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (!stored) return false;
      
      const authData: AuthData = JSON.parse(stored);
      const now = Date.now();
      
      // Check if auth has expired
      if (now - authData.timestamp > AUTH_DURATION) {
        this.logout();
        return false;
      }
      
      return authData.isAuthenticated;
    } catch (error) {
      console.error('Error checking auth:', error);
      this.logout();
      return false;
    }
  },

  // Set user as authenticated
  login(): void {
    if (typeof window === 'undefined') return;
    
    const authData: AuthData = {
      timestamp: Date.now(),
      isAuthenticated: true
    };
    
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    } catch (error) {
      console.error('Error storing auth:', error);
    }
  },

  // Remove authentication
  logout(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Error removing auth:', error);
    }
  },

  // Get remaining time in minutes
  getRemainingTime(): number {
    if (typeof window === 'undefined') return 0;
    
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (!stored) return 0;
      
      const authData: AuthData = JSON.parse(stored);
      const now = Date.now();
      const elapsed = now - authData.timestamp;
      const remaining = AUTH_DURATION - elapsed;
      
      return remaining > 0 ? Math.ceil(remaining / (60 * 1000)) : 0;
    } catch (error) {
      return 0;
    }
  },

  // Verify credentials and login if correct
  async verifyAndLogin(username: string, password: string): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.login();
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }
};

// Hook for React components to use auth
export const useAdminAuth = () => {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      login: () => {},
      logout: () => {},
      getRemainingTime: () => 0,
      verifyAndLogin: async () => false
    };
  }
  
  return adminAuth;
};
