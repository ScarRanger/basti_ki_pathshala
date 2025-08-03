import { createClient } from '@supabase/supabase-js'

// For Vercel serverless functions, environment variables are available directly
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    if (req.method === 'GET') {
      // Get all applications
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      res.status(200).json({ success: true, data })
    } else if (req.method === 'POST') {
      // Create new application
      const { data, error } = await supabase
        .from('applications')
        .insert([req.body])
        .select()
      
      if (error) throw error
      
      res.status(201).json({ success: true, data: data[0] })
    } else if (req.method === 'PUT') {
      // Update application status
      const { id, status } = req.body
      
      const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)
        .select()
      
      if (error) throw error
      
      res.status(200).json({ success: true, data: data[0] })
    } else if (req.method === 'DELETE') {
      // Delete application
      const { id } = req.query
      
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      res.status(200).json({ success: true })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: error.message })
  }
}
