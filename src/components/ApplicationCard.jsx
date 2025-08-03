import { useState } from 'react'
import './ApplicationCard.css'

const ApplicationCard = ({ application, onStatusUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745'
      case 'rejected': return '#dc3545'
      case 'pending': return '#ffc107'
      default: return '#6c757d'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="application-card">
      <div className="card-header">
        <div className="applicant-info">
          <h3>{application.firstName} {application.lastName}</h3>
          <div className="badges">
            <span className={`type-badge ${application.type}`}>
              {application.type}
            </span>
            <span 
              className={`status-badge ${application.status}`}
              style={{ backgroundColor: getStatusColor(application.status) }}
            >
              {application.status}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="expand-btn"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      <div className="card-basic-info">
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Age:</strong> {application.age}</p>
        <p><strong>Applied:</strong> {formatDate(application.created_at)}</p>
      </div>

      {isExpanded && (
        <div className="card-expanded">
          <div className="info-section">
            <h4>Personal Details</h4>
            <p><strong>Education:</strong> {application.education}</p>
            <p><strong>Address:</strong> {application.address}</p>
            <p><strong>Emergency Contact:</strong> {application.emergencyContact} ({application.emergencyPhone})</p>
          </div>

          <div className="info-section">
            <h4>Experience & Skills</h4>
            <div className="text-block">
              <p><strong>Experience:</strong></p>
              <p>{application.experience}</p>
            </div>
            <div className="text-block">
              <p><strong>Skills:</strong></p>
              <p>{application.skills}</p>
            </div>
            <div className="text-block">
              <p><strong>Motivation:</strong></p>
              <p>{application.motivation}</p>
            </div>
            <div className="text-block">
              <p><strong>Availability:</strong></p>
              <p>{application.availability}</p>
            </div>
          </div>
        </div>
      )}

      <div className="card-actions">
        <div className="status-actions">
          <button
            onClick={() => onStatusUpdate(application.id, 'approved')}
            className="action-btn approve-btn"
            disabled={application.status === 'approved'}
          >
            Approve
          </button>
          <button
            onClick={() => onStatusUpdate(application.id, 'rejected')}
            className="action-btn reject-btn"
            disabled={application.status === 'rejected'}
          >
            Reject
          </button>
          <button
            onClick={() => onStatusUpdate(application.id, 'pending')}
            className="action-btn pending-btn"
            disabled={application.status === 'pending'}
          >
            Pending
          </button>
        </div>
        <button
          onClick={() => onDelete(application.id)}
          className="action-btn delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ApplicationCard
