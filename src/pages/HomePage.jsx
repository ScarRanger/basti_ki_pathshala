import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Basti Ki Pathshala</h1>
          <p>
            Join our mission to educate and empower communities. We're looking for passionate 
            individuals who want to make a difference through education and community service.
          </p>
          <div className="hero-buttons">
            <Link to="/register/intern" className="btn btn-primary">
              Apply as Intern
            </Link>
            <Link to="/register/volunteer" className="btn btn-secondary">
              Apply as Volunteer
            </Link>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="icon">🎓</div>
              <h3>Internship Program</h3>
              <p>
                Get hands-on experience in education technology, community outreach, 
                and social impact. Our internship program offers mentorship and real-world 
                project experience.
              </p>
              <ul>
                <li>Duration: 3-6 months</li>
                <li>Stipend provided</li>
                <li>Certificate of completion</li>
                <li>Mentorship opportunities</li>
              </ul>
            </div>

            <div className="info-card">
              <div className="icon">🤝</div>
              <h3>Volunteer Program</h3>
              <p>
                Make a direct impact in local communities by volunteering your time and skills. 
                Help us reach more students and families in need of educational support.
              </p>
              <ul>
                <li>Flexible timing</li>
                <li>Various skill areas</li>
                <li>Community impact</li>
                <li>Volunteer recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            Basti Ki Pathshala is dedicated to providing quality education and resources 
            to underserved communities. We believe that education is the key to breaking 
            the cycle of poverty and creating opportunities for all.
          </p>
          <div className="stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Students Impacted</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Volunteers</p>
            </div>
            <div className="stat">
              <h3>10+</h3>
              <p>Communities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
