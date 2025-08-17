import React, { useEffect, useState } from 'react'
import API from '../api'

export default function Dashboard(){
  const [list,setList]=useState([])
  const [title,setTitle]=useState('')
  const [amount,setAmount]=useState('')
  const [category,setCategory]=useState('General')
  const [error,setError]=useState(null)
  const user = JSON.parse(localStorage.getItem('user')||'{}')

  const load = async ()=>{
    try{
      const { data } = await API.get('/expenses')
      setList(data)
    }catch(err){
      setError('Failed to load expenses')
    }
  }
  useEffect(()=>{ load() }, [])

  const add = async (e)=>{
    e.preventDefault()
    try{
      const amt = parseFloat(amount)
      await API.post('/expenses', { title, amount: amt, category })
      setTitle(''); setAmount(''); setCategory('General')
      load()
    }catch(err){
      setError('Add failed')
    }
  }

  const del = async (id)=>{
    await API.delete('/expenses/'+id); load()
  }

  return (
    <div style={{maxWidth:720,margin:'30px auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={user.photoUrl||'https://via.placeholder.com/48'} width="48" height="48" style={{borderRadius:24}}/>
        <div>
          <div>Welcome, <b>{user.name||'User'}</b></div>
          <div style={{fontSize:12,color:'#666'}}>{user.email}</div>
        </div>
      </div>

      <h2 style={{marginTop:20}}>Your Expenses</h2>
      {error && <div style={{color:'red'}}>{error}</div>}

      <form onSubmit={add} style={{display:'flex',gap:8,margin:'10px 0'}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} type="number" step="0.01" />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <button>Add</button>
      </form>

      <ul>
        {list.map(x=>(
          <li key={x._id} style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #eee',padding:'6px 0'}}>
            <span>{x.title} — ₹{x.amount} <em>({x.category})</em></span>
            <button onClick={()=>del(x._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
