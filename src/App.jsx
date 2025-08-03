import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import RegistrationForm from './pages/RegistrationForm'
import AdminView from './pages/AdminView'
import Navbar from './components/Navbar'
import ConfigurationNotice from './components/ConfigurationNotice'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ConfigurationNotice />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register/:type" element={<RegistrationForm />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
