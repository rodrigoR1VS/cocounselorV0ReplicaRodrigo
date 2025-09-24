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

  // Verify password and login if correct
  verifyAndLogin(password: string): boolean {
    const isValid = password === 'weAreMarketing2025!#';
    if (isValid) {
      this.login();
    }
    return isValid;
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
      verifyAndLogin: () => false
    };
  }
  
  return adminAuth;
};
