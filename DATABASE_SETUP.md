# Database Schema for Basti Ki Pathshala

## Supabase Setup Instructions

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Run the following SQL to create the applications table:

```sql
-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  age INTEGER NOT NULL,
  education VARCHAR(100) NOT NULL,
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  skills TEXT NOT NULL,
  availability TEXT NOT NULL,
  address TEXT NOT NULL,
  emergency_contact VARCHAR(255) NOT NULL,
  emergency_phone VARCHAR(20) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('intern', 'volunteer')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on type for faster filtering
CREATE INDEX IF NOT EXISTS idx_applications_type ON applications(type);

-- Create an index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read and insert (for the application form)
CREATE POLICY "Allow public read and insert" ON applications
  FOR ALL USING (true);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

4. Update your `.env` file with your Supabase credentials:
   - VITE_SUPABASE_URL=your_supabase_project_url
   - VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

## Table Structure

### applications
- `id` - Primary key (auto-increment)
- `first_name` - Applicant's first name
- `last_name` - Applicant's last name
- `email` - Email address
- `phone` - Phone number
- `age` - Age of applicant
- `education` - Education level
- `experience` - Relevant experience description
- `motivation` - Why they want to join
- `skills` - Skills and abilities
- `availability` - When they are available
- `address` - Full address
- `emergency_contact` - Emergency contact name
- `emergency_phone` - Emergency contact phone
- `type` - 'intern' or 'volunteer'
- `status` - 'pending', 'approved', or 'rejected'
- `created_at` - When application was submitted
- `updated_at` - When application was last updated

## Environment Variables for Deployment

For Vercel deployment, you'll need to set these environment variables in your Vercel dashboard:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_SUPABASE_URL` - Same as SUPABASE_URL (for frontend)
- `VITE_SUPABASE_ANON_KEY` - Same as SUPABASE_ANON_KEY (for frontend)
- `VITE_ADMIN_PASSWORD` - Password for admin access (default: admin123)
