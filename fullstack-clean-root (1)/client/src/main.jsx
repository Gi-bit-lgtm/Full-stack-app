import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App(){
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <nav style={{display:'flex',gap:12,padding:12,borderBottom:'1px solid #eee'}}>
        <Link to="/">Dashboard</Link>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <button onClick={()=>{localStorage.clear();location.href='/login'}}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={token ? <Dashboard/> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
