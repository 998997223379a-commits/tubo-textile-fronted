import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [form, setForm] = useState({
    ishchi_id: '', stanok_id: '', sana: '', keldi_vaqt: '', ketdi_vaqt: ''
  });

  useEffect(() => {
http://tubo-textile-backend.onrender.com
    axios.get('http://tubo-textile-backend.onrender.com/api/machines').then(r => setMachines(r.data));
    axios.get('http://tubo-textile-backend.onrender.com/api/attendance').then(r => setAttendance(r.data));
  }, []);

  function add() {
    axios.post('http://tubo-textile-backend.onrender.com/api/attendance', form).then(r => {
      setAttendance([...attendance, r.data]);
      setForm({ ishchi_id: '', stanok_id: '', sana: '', keldi_vaqt: '', ketdi_vaqt: '' });
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

  const s = { padding: '8px', border: '2px solid #c4b5fd', borderRadius: '8px' };

  return (
    <div>
      <h2>Davomat</h2>
      <div style={{background:'white',padding:'20px',borderRadius:'12px',marginBottom:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <h3>Yangi davomat</h3>
        <div style={{display:'flex',gap:'10px',alignItems:'flex-end',flexWrap:'wrap'}}>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Ishchi</label>
            <select value={form.ishchi_id} onChange={e => setForm({...form,ishchi_id:e.target.value})} style={s}>
              <option value="">Tanlang</option>
              {workers.map(w => <option key={w.id} value={w.id}>{w.ism}</option>)}
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Stanok</label>
            <select value={form.stanok_id} onChange={e => setForm({...form,stanok_id:e.target.value})} style={s}>
              <option value="">Tanlang</option>
              {machines.map(m => <option key={m.id} value={m.id}>{m.nomi}</option>)}
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Sana</label>
            <input type="date" value={form.sana} onChange={e => setForm({...form,sana:e.target.value})} style={s} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Keldi</label>
            <input type="time" value={form.keldi_vaqt} onChange={e => setForm({...form,keldi_vaqt:e.target.value})} style={s} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Ketdi</label>
            <input type="time" value={form.ketdi_vaqt} onChange={e => setForm({...form,ketdi_vaqt:e.target.value})} style={s} />
          </div>
          <button onClick={add} style={{padding:'10px 20px',background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
            Saqlash
          </button>
        </div>
      </div>
      <div style={{background:'white',borderRadius:'12px',overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white'}}>
              <th style={{padding:'12px'}}>Ishchi</th>
              <th style={{padding:'12px'}}>Stanok</th>
              <th style={{padding:'12px'}}>Sana</th>
              <th style={{padding:'12px'}}>Keldi</th><th style={{padding:'12px'}}>Ketdi</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(a => (
              <tr key={a.id} style={{borderBottom:'1px solid #ede9fe'}}>
                <td style={{padding:'10px'}}>{getWorker(a.ishchi_id)}</td>
                <td style={{padding:'10px'}}>{getMachine(a.stanok_id)}</td>
                <td style={{padding:'10px'}}>{a.sana}</td>
                <td style={{padding:'10px'}}>{a.keldi_vaqt}</td>
                <td style={{padding:'10px'}}>{a.ketdi_vaqt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;