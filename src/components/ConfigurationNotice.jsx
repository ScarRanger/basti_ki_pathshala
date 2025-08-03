import { isSupabaseConfigured } from '../utils/supabase'
import './ConfigurationNotice.css'

const ConfigurationNotice = () => {
  if (isSupabaseConfigured) {
    return null
  }

  return (
    <div className="config-notice">
      <div className="config-notice-content">
        <div className="config-icon">⚠️</div>
        <div className="config-text">
          <h3>Database Not Configured</h3>
          <p>
            Supabase database credentials are not set up. Application forms and admin features will not work until configured.
          </p>
          <div className="config-steps">
            <p><strong>To set up the database:</strong></p>
            <ol>
              <li>Create a Supabase account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
              <li>Follow the setup instructions in <code>DATABASE_SETUP.md</code></li>
              <li>Update your <code>.env</code> file with the correct credentials</li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationNotice
