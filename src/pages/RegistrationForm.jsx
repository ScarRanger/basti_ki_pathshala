import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { applicationsService, isSupabaseConfigured } from '../utils/supabase'
import './RegistrationForm.css'

const RegistrationForm = () => {
  const { type } = useParams() // 'intern' or 'volunteer'
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    education: '',
    experience: '',
    motivation: '',
    skills: '',
    availability: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isSupabaseConfigured) {
      toast.error('Database is not configured. Please set up Supabase credentials first.')
      return
    }

    setIsSubmitting(true)

    try {
      const applicationData = {
        ...formData,
        type: type, // 'intern' or 'volunteer'
        status: 'pending',
        created_at: new Date().toISOString()
      }

      await applicationsService.createApplication(applicationData)
      
      toast.success(`${type === 'intern' ? 'Internship' : 'Volunteer'} application submitted successfully!`)
      navigate('/')
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error(`Failed to submit application: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isIntern = type === 'intern'

  return (
    <div className="registration-page">
      <div className="form-container">
        <div className="form-header">
          <h1>
            {isIntern ? 'Internship' : 'Volunteer'} Application
          </h1>
          <p>
            Fill out the form below to apply for our {isIntern ? 'internship' : 'volunteer'} program.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="16"
                  max="100"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="education">Education Level *</label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Education Level</option>
                  <option value="high-school">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="post-graduate">Post Graduate</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Emergency Contact</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact Name *</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="emergencyPhone">Emergency Contact Phone *</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Experience & Skills</h3>
            <div className="form-group">
              <label htmlFor="experience">
                {isIntern ? 'Relevant Experience' : 'Volunteer Experience'} *
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your relevant experience..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills & Abilities *</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
                placeholder="List your skills that would be valuable for this role..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivation">
                Why do you want to {isIntern ? 'intern' : 'volunteer'} with us? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your motivation..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability *</label>
              <textarea
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                rows="3"
                placeholder="When are you available? Include days, times, and duration..."
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
