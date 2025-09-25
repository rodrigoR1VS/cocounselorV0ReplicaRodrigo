import { Pool, PoolClient } from 'pg';

// Database configuration - support both connection string and individual params
let dbConfig: any;

if (process.env.URL_TRANSACTION_POOL || process.env.URL_DIRECT || process.env.DATABASE_URL || process.env.DB_URL) {
  // Use connection string if available - prefer transaction pool for web apps
  let connectionString = process.env.URL_TRANSACTION_POOL || process.env.URL_DIRECT || process.env.DATABASE_URL || process.env.DB_URL;
  
  // Clean up connection string - remove quotes and trim whitespace
  connectionString = connectionString.replace(/^['"]|['"]$/g, '').trim();
  
  console.log('Using connection string (cleaned)');
  
  dbConfig = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
    // Connection pool settings
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // Increased timeout for Supabase
  };
} else {
  // Use individual parameters
  dbConfig = {
    host: process.env.DB_HOST || process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || process.env.POSTGRES_PORT || '5432'),
    database: process.env.DB_NAME || process.env.POSTGRES_DATABASE || 'postgres',
    user: (process.env.DB_USER || process.env.POSTGRES_USER || 'postgres').replace(/\s+/g, ''), // Remove spaces
    password: (process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'password').replace(/'/g, ''), // Remove quotes
    // SSL configuration for production (like Supabase)
    ssl: process.env.NODE_ENV === 'production' || process.env.DB_HOST ? { rejectUnauthorized: false } : false,
    // Connection pool settings
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Increased timeout for Supabase
  };
}

// Debug: Log connection config (without password)
if (dbConfig.connectionString) {
  console.log('PostgreSQL using connection string:', {
    connectionStringLength: dbConfig.connectionString.length,
    ssl: dbConfig.ssl,
    timeout: dbConfig.connectionTimeoutMillis
  });
} else {
  console.log('PostgreSQL using individual params:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user,
    ssl: dbConfig.ssl,
    timeout: dbConfig.connectionTimeoutMillis
  });
}

// Create connection pool (lazy initialization to avoid startup crashes)
let pool: Pool | null = null;

const getPool = () => {
  if (!pool) {
    pool = new Pool(dbConfig);
    
    pool.on('connect', () => {
      console.log('Connected to PostgreSQL database');
    });

    pool.on('error', (err) => {
      console.error('PostgreSQL connection error:', err);
    });
  }
  return pool;
};

// Export pool for database operations
export default getPool;

// Helper function to execute queries
export const query = async (text: string, params?: any[]): Promise<any> => {
  const start = Date.now();
  try {
    const pool = getPool();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Helper function to get a client from the pool
export const getClient = (): Promise<PoolClient> => {
  return getPool().connect();
};

// Helper function to close the pool (for graceful shutdown)
export const closePool = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('PostgreSQL pool closed');
  }
};
