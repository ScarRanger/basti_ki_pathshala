import { useState } from 'react'
import { toast } from 'react-hot-toast'
import './AdminLogin.css'

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple password check - in a real app, this should be more secure
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
    
    setTimeout(() => {
      if (password === adminPassword) {
        toast.success('Login successful!')
        onLogin(true)
      } else {
        toast.error('Invalid password!')
        onLogin(false)
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Enter your password to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !password}
            className="login-btn"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-note">
          <p><small>Default password: admin123</small></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
