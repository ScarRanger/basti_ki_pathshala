import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here')

let supabase = null

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
  }
}

export { supabase }

// Helper functions for database operations
export const applicationsService = {
  // Create a new application
  async createApplication(applicationData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up your database credentials.')
    }

    // Transform frontend field names to database column names
    const dbData = {
      first_name: applicationData.firstName,
      last_name: applicationData.lastName,
      email: applicationData.email,
      phone: applicationData.phone,
      age: parseInt(applicationData.age),
      education: applicationData.education,
      experience: applicationData.experience,
      motivation: applicationData.motivation,
      skills: applicationData.skills,
      availability: applicationData.availability,
      address: applicationData.address,
      emergency_contact: applicationData.emergencyContact,
      emergency_phone: applicationData.emergencyPhone,
      type: applicationData.type,
      status: applicationData.status || 'pending'
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([dbData])
      .select()
    
    if (error) throw error
    return this.transformDbToFrontend(data[0])
  },

  // Get all applications (admin view)
  async getAllApplications() {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up your database credentials.')
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data?.map(item => this.transformDbToFrontend(item)) || []
  },

  // Get applications by type
  async getApplicationsByType(type) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up your database credentials.')
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data?.map(item => this.transformDbToFrontend(item)) || []
  },

  // Update application status
  async updateApplicationStatus(id, status) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up your database credentials.')
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return this.transformDbToFrontend(data[0])
  },

  // Delete application
  async deleteApplication(id) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up your database credentials.')
    }

    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // Transform database fields to frontend camelCase
  transformDbToFrontend(dbRecord) {
    if (!dbRecord) return null
    
    return {
      id: dbRecord.id,
      firstName: dbRecord.first_name,
      lastName: dbRecord.last_name,
      email: dbRecord.email,
      phone: dbRecord.phone,
      age: dbRecord.age,
      education: dbRecord.education,
      experience: dbRecord.experience,
      motivation: dbRecord.motivation,
      skills: dbRecord.skills,
      availability: dbRecord.availability,
      address: dbRecord.address,
      emergencyContact: dbRecord.emergency_contact,
      emergencyPhone: dbRecord.emergency_phone,
      type: dbRecord.type,
      status: dbRecord.status,
      created_at: dbRecord.created_at,
      updated_at: dbRecord.updated_at
    }
  }
}
