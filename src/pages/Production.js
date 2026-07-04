import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Production() {
  const [productions, setProductions] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [form, setForm] = useState({
    ishchi_id: '', stanok_id: '', sana: '', kilo: '', mahsulot_turi: ''
  });

  useEffect(() => {
http://tubo-textile-backend.onrender.com
    axios.get('http://tubo-textile-backend.onrender.com/api/machines').then(r => setMachines(r.data));
    axios.get('http://tubo-textile-backend.onrender.com/api/production').then(r => setProductions(r.data));
  }, []);

  function add() {
    axios.post('http://tubo-textile-backend.onrender.com/api/production', form).then(r => {
      setProductions([...productions, r.data]);
      setForm({ ishchi_id: '', stanok_id: '', sana: '', kilo: '', mahsulot_turi: '' });
    });
  }

  function getWorker(id) {
    const w = workers.find(w => w.id === parseInt(id));
    return w ? w.ism : '-';
  }

  function getMachine(id) {
    const m = machines.find(m => m.id === parseInt(id));
    return m ? m.nomi : '-';
  }

  const jami = productions.reduce((sum, p) => sum + parseFloat(p.kilo || 0), 0);
  const s = { padding: '8px', border: '2px solid #c4b5fd', borderRadius: '8px' };

  return (
    <div>
      <h2>Ishlab chiqarish</h2>
      <div style={{background:'linear-gradient(90deg,#6366f1,#8b5cf6)',borderRadius:'12px',padding:'20px',marginBottom:'20px',color:'white'}}>
        <p style={{fontSize:'13px',opacity:0.8}}>Jami ishlab chiqarilgan</p>
        <h2 style={{fontSize:'36px',margin:0}}>{jami.toFixed(2)} kg</h2>
      </div>
      <div style={{background:'white',padding:'20px',borderRadius:'12px',marginBottom:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <h3>Kunlik kiritish</h3>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-end',flexWrap:'wrap'}}>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Ishchi</label>
            <select value={form.ishchi_id} onChange={e => setForm({...form,ishchi_id:e.target.value})} style={s}>
              <option value="">Tanlang</option>
              {workers.map(w => (
                <option key={w.id} value={w.id}>{w.ism}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Stanok</label>
            <select value={form.stanok_id} onChange={e => setForm({...form,stanok_id:e.target.value})} style={s}>
              <option value="">Tanlang</option>
              {machines.map(m => (
                <option key={m.id} value={m.id}>{m.nomi}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Sana</label>
            <input type="date" value={form.sana} onChange={e => setForm({...form,sana:e.target.value})} style={s} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Kilo</label>
            <input type="number" value={form.kilo} onChange={e => setForm({...form,kilo:e.target.value})} style={{...s,width:'100px'}} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Mahsulot turi</label>
            <input value={form.mahsulot_turi} onChange={e => setForm({...form,mahsulot_turi:e.target.value})} style={s} placeholder="Shnur turi" />
          </div>
          <button onClick={add} style={{padding:'10px 20px',background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
            Saqlash
          </button>
        </div></div>
      <div style={{background:'white',borderRadius:'12px',overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white'}}>
              <th style={{padding:'12px'}}>Ishchi</th>
              <th style={{padding:'12px'}}>Stanok</th>
              <th style={{padding:'12px'}}>Sana</th>
              <th style={{padding:'12px'}}>Kilo</th>
              <th style={{padding:'12px'}}>Mahsulot turi</th>
            </tr>
          </thead>
          <tbody>
            {productions.map(p => (
              <tr key={p.id} style={{borderBottom:'1px solid #ede9fe'}}>
                <td style={{padding:'10px'}}>{getWorker(p.ishchi_id)}</td>
                <td style={{padding:'10px'}}>{getMachine(p.stanok_id)}</td>
                <td style={{padding:'10px'}}>{p.sana}</td>
                <td style={{padding:'10px',fontWeight:'bold',color:'#6366f1'}}>{p.kilo} kg</td>
                <td style={{padding:'10px'}}>{p.mahsulot_turi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Production;