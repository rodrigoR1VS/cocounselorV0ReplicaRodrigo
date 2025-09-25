# PostgreSQL Setup for Cocounselor Blogs

This project now uses PostgreSQL as the database for storing blog data.

## Local Development Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**
Download and install from https://www.postgresql.org/download/

### 2. Create Database and User

Connect to PostgreSQL as the postgres user:
```bash
psql -U postgres
```

Create the database and user:
```sql
-- Create database
CREATE DATABASE cocounselor_blogs;

-- Create user (optional, you can use the default postgres user)
CREATE USER cocounselor_user WITH PASSWORD 'your_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE cocounselor_blogs TO cocounselor_user;

-- Exit psql
\q
```

### 3. Environment Variables

Create a `.env.local` file in the project root:
```env
# PostgreSQL Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=cocounselor_blogs
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here

# Environment
NODE_ENV=development
```

### 4. Initialize Database Schema

The database tables will be created automatically when you first run the application, but you can also create them manually:

```bash
# Initialize database tables
curl http://localhost:3000/api/migrate-postgres
```

Or run the SQL schema manually:
```bash
psql -U postgres -d cocounselor_blogs -f lib/db/schema.sql
```

### 5. Migrate Existing Data

If you have existing blog data in `blogs.json`, you can migrate it to PostgreSQL:

```bash
# Migrate from blogs.json to PostgreSQL
curl -X POST http://localhost:3000/api/migrate-postgres
```

### 6. Test Connection

Test your PostgreSQL connection:
```bash
curl http://localhost:3000/api/test-postgres
```

## Production Setup (Vercel)

### 1. Database Hosting

You can use any PostgreSQL hosting service such as:
- **Vercel Postgres** (recommended for Vercel deployments)
- **Railway**
- **Supabase**
- **Neon**
- **PlanetScale** (MySQL, but similar setup)

### 2. Vercel Postgres Setup

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Storage" tab
4. Create a new PostgreSQL database
5. Copy the connection details

### 3. Environment Variables in Vercel

Add these environment variables in your Vercel project settings:

```env
POSTGRES_HOST=your-host
POSTGRES_PORT=5432
POSTGRES_DATABASE=your-database
POSTGRES_USER=your-user
POSTGRES_PASSWORD=your-password
NODE_ENV=production
```

Or use a single connection string:
```env
DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
```

### 4. Deploy and Initialize

1. Deploy your application to Vercel
2. Initialize the database by visiting: `https://your-app.vercel.app/api/migrate-postgres`
3. Test the connection: `https://your-app.vercel.app/api/test-postgres`

## API Endpoints

- `GET /api/test-postgres` - Test PostgreSQL connection
- `GET /api/migrate-postgres` - Initialize database tables
- `POST /api/migrate-postgres` - Migrate data from blogs.json to PostgreSQL
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[blogId]` - Get specific blog
- `PUT /api/blogs/[blogId]` - Update blog
- `DELETE /api/blogs/[blogId]` - Delete blog

## Database Schema

### blogs table
- `blog_id` (VARCHAR, PRIMARY KEY)
- `published_date` (TIMESTAMP WITH TIME ZONE)
- `title` (VARCHAR)
- `subtitle` (TEXT)
- `banner_image` (VARCHAR)
- `seo_meta_title` (VARCHAR)
- `seo_meta_description` (TEXT)
- `seo_keywords` (TEXT[])
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

### blog_paragraphs table
- `id` (SERIAL, PRIMARY KEY)
- `blog_id` (VARCHAR, FOREIGN KEY)
- `paragraph_id` (INTEGER)
- `content` (TEXT)
- `image_url` (VARCHAR)
- `created_at` (TIMESTAMP WITH TIME ZONE)

## Troubleshooting

### Connection Issues
1. Verify PostgreSQL is running: `brew services list | grep postgresql`
2. Check credentials in `.env.local`
3. Ensure database exists: `psql -U postgres -l`

### Permission Issues
```sql
-- Connect as postgres user and grant permissions
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

### SSL Issues in Production
For production environments, SSL is usually required. The configuration includes:
```javascript
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
```
