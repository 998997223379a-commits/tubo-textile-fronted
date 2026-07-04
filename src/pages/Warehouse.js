import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Warehouse() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nomi: '', miqdor: '', birlik: 'kg' });

  useEffect(() => {
    axios.get('http://tubo-textile-backend.onrender.com/api/warehouse').then(r => setItems(r.data));
  }, []);

  function add() {
    axios.post('http://tubo-textile-backend.onrender.com/api/warehouse', form).then(r => {
      setItems([...items, r.data]);
      setForm({ nomi: '', miqdor: '', birlik: 'kg' });
    });
  }

  function remove(id) {
    axios.delete('http://tubo-textile-backend.onrender.com/api/warehouse/' + id)
      .then(() => setItems(items.filter(i => i.id !== id)));
  }

  const s = { padding: '8px', border: '2px solid #c4b5fd', borderRadius: '8px' };

  return (
    <div>
      <h2>Omborxona</h2>
      <div style={{background:'white',padding:'20px',borderRadius:'12px',marginBottom:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <h3>Yangi mahsulot qoshish</h3>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-end',flexWrap:'wrap'}}>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Nomi</label>
            <input value={form.nomi} onChange={e => setForm({...form,nomi:e.target.value})} style={s} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Miqdori</label>
            <input type="number" value={form.miqdor} onChange={e => setForm({...form,miqdor:e.target.value})} style={{...s,width:'100px'}} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Birlik</label>
            <select value={form.birlik} onChange={e => setForm({...form,birlik:e.target.value})} style={s}>
              <option value="kg">kg</option>
              <option value="metr">metr</option>
              <option value="dona">dona</option>
              <option value="litr">litr</option>
            </select>
          </div>
          <button onClick={add} style={{padding:'10px 20px',background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
            Qoshish
          </button>
        </div>
      </div>
      <div style={{background:'white',borderRadius:'12px',overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white'}}>
              <th style={{padding:'12px'}}>Nomi</th>
              <th style={{padding:'12px'}}>Miqdori</th>
              <th style={{padding:'12px'}}>Birlik</th>
              <th style={{padding:'12px'}}>Amal</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} style={{borderBottom:'1px solid #ede9fe'}}>
                <td style={{padding:'10px'}}>{i.nomi}</td>
                <td style={{padding:'10px',color: i.miqdor < 10 ? 'red' : 'green', fontWeight:'bold'}}>{i.miqdor}</td>
                <td style={{padding:'10px'}}>{i.birlik}</td>
                <td style={{padding:'10px'}}>
                  <button onClick={() => remove(i.id)} style={{padding:'4px 12px',background:'#dc3545',color:'white',border:'none',borderRadius:'6px',cursor:'pointer'}}>
                    Ochirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Warehouse;