import React, { useState } from 'react'
import API from '../api'

export default function Register(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [photo,setPhoto]=useState(null)
  const [error,setError]=useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    setError(null)
    try{
      let photoUrl = ''
      if(photo){
        const form = new FormData()
        form.append('photo', photo)
        const { data: up } = await API.post('/upload', form, { headers: { 'Content-Type':'multipart/form-data' } })
        photoUrl = up.url
      }
      const { data } = await API.post('/auth/register',{ name,email,password,photoUrl })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      location.href='/'
    }catch(err){
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div style={{maxWidth:360,margin:'60px auto'}}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}}/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}}/>
        <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files[0])} style={{margin:'8px 0'}}/>
        {error && <div style={{color:'red'}}>{error}</div>}
        <button>Register</button>
      </form>
    </div>
  )
}
