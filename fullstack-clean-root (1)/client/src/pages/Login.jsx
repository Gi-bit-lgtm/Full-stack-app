import React, { useState } from 'react'
import API from '../api'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    setError(null)
    try{
      const { data } = await API.post('/auth/login',{ email,password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      location.href='/'
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div style={{maxWidth:360,margin:'60px auto'}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}}/>
        {error && <div style={{color:'red'}}>{error}</div>}
        <button>Login</button>
      </form>
    </div>
  )
}
