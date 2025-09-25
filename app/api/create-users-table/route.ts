import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

export async function POST() {
  try {
    console.log('Creating users table and default admin user...');
    
    // Begin transaction
    await query('BEGIN');
    
    try {
      // Create simple users table
      console.log('Creating users table...');
      await query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `);

      // Create index
      await query(`CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username)`);

      // Check if admin user already exists
      const existingAdmin = await query(`
        SELECT id FROM admin_users WHERE username = 'admin'
      `);

      if (existingAdmin.rows.length === 0) {
        // Create default admin user
        console.log('Creating default admin user...');
        await query(`
          INSERT INTO admin_users (username, password)
          VALUES ($1, $2)
        `, [
          'admin',
          'weAreMarketing2025!#'
        ]);

        console.log('Default admin user created');
      } else {
        console.log('Admin user already exists');
      }

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Users table created successfully',
        defaultCredentials: {
          username: 'admin',
          password: 'weAreMarketing2025!#'
        }
      });
      
    } catch (error) {
      // Rollback transaction on error
      await query('ROLLBACK');
      throw error;
    }
    
  } catch (error: any) {
    console.error('Users table creation error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Check users table status
    const usersInfo = await query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'admin_users'
      ORDER BY ordinal_position
    `);
    
    const userCount = await query(`
      SELECT COUNT(*) as count FROM admin_users
    `);
    
    return NextResponse.json({
      success: true,
      message: 'Users table information retrieved',
      columns: usersInfo.rows,
      totalUsers: userCount.rows[0]?.count || 0
    });
    
  } catch (error: any) {
    console.error('Users table check error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
