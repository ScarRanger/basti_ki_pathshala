import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { applicationsService, isSupabaseConfigured } from '../utils/supabase'
import AdminLogin from '../components/AdminLogin'
import ApplicationCard from '../components/ApplicationCard'
import './AdminView.css'

const AdminView = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all') // 'all', 'intern', 'volunteer'
  const [statusFilter, setStatusFilter] = useState('all') // 'all', 'pending', 'approved', 'rejected'

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('adminAuthenticated')
    if (adminAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications()
    }
  }, [isAuthenticated])

  const fetchApplications = async () => {
    if (!isSupabaseConfigured) {
      toast.error('Database is not configured. Please set up Supabase credentials.')
      return
    }

    setLoading(true)
    try {
      const data = await applicationsService.getAllApplications()
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error(`Failed to load applications: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthenticated', 'true')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
  }

  const handleStatusUpdate = async (id, newStatus) => {
    if (!isSupabaseConfigured) {
      toast.error('Database is not configured. Please set up Supabase credentials.')
      return
    }

    try {
      await applicationsService.updateApplicationStatus(id, newStatus)
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        )
      )
      toast.success(`Application ${newStatus} successfully`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error(`Failed to update application status: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    if (!isSupabaseConfigured) {
      toast.error('Database is not configured. Please set up Supabase credentials.')
      return
    }

    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationsService.deleteApplication(id)
        setApplications(prev => prev.filter(app => app.id !== id))
        toast.success('Application deleted successfully')
      } catch (error) {
        console.error('Error deleting application:', error)
        toast.error(`Failed to delete application: ${error.message}`)
      }
    }
  }

  const filteredApplications = applications.filter(app => {
    const typeMatch = filter === 'all' || app.type === filter
    const statusMatch = statusFilter === 'all' || app.status === statusFilter
    return typeMatch && statusMatch
  })

  const getStats = () => {
    const total = applications.length
    const interns = applications.filter(app => app.type === 'intern').length
    const volunteers = applications.filter(app => app.type === 'volunteer').length
    const pending = applications.filter(app => app.status === 'pending').length
    const approved = applications.filter(app => app.status === 'approved').length
    const rejected = applications.filter(app => app.status === 'rejected').length

    return { total, interns, volunteers, pending, approved, rejected }
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  const stats = getStats()

  return (
    <div className="admin-view">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>{stats.interns}</h3>
            <p>Intern Applications</p>
          </div>
          <div className="stat-card">
            <h3>{stats.volunteers}</h3>
            <p>Volunteer Applications</p>
          </div>
          <div className="stat-card">
            <h3>{stats.pending}</h3>
            <p>Pending Review</p>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <div className="admin-config-warning">
            <p>⚠️ Database not configured - Application management features are disabled</p>
          </div>
        )}
      </div>

      <div className="admin-content">
        <div className="filters">
          <div className="filter-group">
            <label>Filter by Type:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="intern">Interns</option>
              <option value="volunteer">Volunteers</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <button onClick={fetchApplications} className="refresh-btn">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading applications...</div>
        ) : filteredApplications.length === 0 ? (
          <div className="no-applications">
            <p>No applications found matching the current filters.</p>
          </div>
        ) : (
          <div className="applications-grid">
            {filteredApplications.map(application => (
              <ApplicationCard
                key={application.id}
                application={application}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminView
