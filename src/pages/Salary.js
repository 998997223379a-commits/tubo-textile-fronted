import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://tubo-textile-backend.onrender.com';

function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [form, setForm] = useState({
    ishchi_id: '', oy: '', jami_kilo: '', kpi: ''
  });

  useEffect(() => {
    axios.get(API + '/api/workers').then(r => setWorkers(r.data));
    axios.get(API + '/api/salary').then(r => setSalaries(r.data));
  }, []);

  function hisoblash() {
    const maosh = (parseFloat(form.jami_kilo) * parseFloat(form.kpi)).toFixed(2);
    axios.post(API + '/api/salary', { ...form, maosh }).then(r => {
      setSalaries([...salaries, r.data]);
      setForm({ ishchi_id: '', oy: '', jami_kilo: '', kpi: '' });
    });
  }

  function getWorkerName(id) {
    const w = workers.find(w => w.id === parseInt(id));
    return w ? w.ism : '-';
  }

  const s = { padding: '8px', border: '2px solid #c4b5fd', borderRadius: '8px' };

  return (
    <div>
      <h2>Maosh hisoblash</h2>
      <div style={{background:'white',padding:'20px',borderRadius:'12px',marginBottom:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <h3>Yangi hisob</h3>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-end',flexWrap:'wrap'}}>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Ishchi</label>
            <select value={form.ishchi_id} onChange={e => setForm({...form,ishchi_id:e.target.value})} style={s}>
              <option value="">Tanlang</option>
              {workers.map(w => <option key={w.id} value={w.id}>{w.ism}</option>)}
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Oy</label>
            <input placeholder="2026-07" value={form.oy} onChange={e => setForm({...form,oy:e.target.value})} style={s} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Jami kilo</label>
            <input type="number" value={form.jami_kilo} onChange={e => setForm({...form,jami_kilo:e.target.value})} style={{...s,width:'110px'}} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>KPI (so'm/kg)</label>
            <input type="number" value={form.kpi} onChange={e => setForm({...form,kpi:e.target.value})} style={{...s,width:'120px'}} />
          </div>
          <div style={{background:'#f0f4ff',padding:'10px',borderRadius:'8px',minWidth:'150px'}}>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Maosh</label>
            <strong style={{color:'#4f46e5',fontSize:'18px'}}>
              {form.jami_kilo && form.kpi ? (parseFloat(form.jami_kilo) * parseFloat(form.kpi)).toLocaleString() + " so'm" : '-'}
            </strong>
          </div>
          <button onClick={hisoblash} style={{padding:'10px 20px',background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
            Saqlash
          </button>
        </div>
      </div>
      <div style={{background:'white',borderRadius:'12px',overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        table style={{width:'100%',borderCollapse:'collapse'}}
          <thead>
            <tr style={{background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white'}}>
              <th style={{padding:'12px'}}>Ishchi</th>
              <th style={{padding:'12px'}}>Oy</th>
              <th style={{padding:'12px'}}>Jami kilo</th>
              <th style={{padding:'12px'}}>KPI</th>
              <th style={{padding:'12px'}}>Maosh</th>
            </tr>
          </thead>
          <tbody></tbody>{salaries.map(s => (
              <tr key={s.id} style={{borderBottom:'1px solid #ede9fe'}}>
                <td style={{padding:'10px'}}>{getWorkerName(s.ishchi_id)}</td>
                <td style={{padding:'10px'}}>{s.oy}</td>
                <td style={{padding:'10px'}}>{s.jami_kilo} kg</td>
                <td style={{padding:'10px'}}>{s.kpi}</td>
                <td style={{padding:'10px',color:'#4f46e5',fontWeight:'bold'}}>{parseFloat(s.maosh).toLocaleString()} so'm</td>
              </tr>
            ))}
          /tbody
        /table
      </div>
    </div>
  );
}

export default Salary;