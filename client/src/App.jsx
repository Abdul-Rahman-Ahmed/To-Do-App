import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import Dashboard from './pages/Dashboard'
import './App.scss'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
