import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [machines, setMachines] = useState([]);
  const [form, setForm] = useState({
    mijoz:'', model:'', rang:'', uzunlik:'', turi:'uchlama', miqdor_kilo:'', sana:'', muddat:''
  });

  useEffect(() => {
    axios.get('http://tubo-textile-backend.onrender.com/api/orders').then(r => setOrders(r.data));
    axios.get('http://tubo-textile-backend.onrender.com/api/machines').then(r => setMachines(r.data));
  }, []);

  function add() {
    axios.post('http://tubo-textile-backend.onrender.com/api/orders', form).then(r => {
      setOrders([...orders, r.data]);
      setForm({ mijoz:'', model:'', rang:'', uzunlik:'', turi:'uchlama', miqdor_kilo:'', sana:'', muddat:'' });
    });
  }

  function update(id, holat, stanok_id) {
    axios.put('http://tubo-textile-backend.onrender.com/api/orders/' + id, { holat, stanok_id })
      .then(() => setOrders(orders.map(o => o.id === id ? { ...o, holat, stanok_id } : o)));
  }

  const s = { padding:'8px', border:'2px solid #c4b5fd', borderRadius:'8px' };

  return (
    <div>
      <h2>Buyurtmalar</h2>
      <div style={{background:'white',padding:'20px',borderRadius:'12px',marginBottom:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <h3>Yangi buyurtma</h3>
        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',alignItems:'flex-end'}}>
          {[['Mijoz','mijoz'],['Model','model'],['Rangi','rang']].map(([l,k]) => (
            <div key={k}>
              <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>{l}</label>
              <input value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} style={s} />
            </div>
          ))}
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Uzunlik m</label>
            <input type="number" value={form.uzunlik} onChange={e => setForm({...form,uzunlik:e.target.value})} style={{...s,width:'100px'}} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Turi</label>
            <select value={form.turi} onChange={e => setForm({...form,turi:e.target.value})} style={s}>
              <option value="uchlama">Uchlama</option>
              <option value="qoplama">Qoplama</option>
              <option value="metraj">Metraj</option>
            </select>
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Miqdor kg</label>
            <input type="number" value={form.miqdor_kilo} onChange={e => setForm({...form,miqdor_kilo:e.target.value})} style={{...s,width:'100px'}} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Zakaz sanasi</label>
            <input type="date" value={form.sana} onChange={e => setForm({...form,sana:e.target.value})} style={s} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'12px',color:'#6366f1'}}>Muddat</label>
            <input type="date" value={form.muddat} onChange={e => setForm({...form,muddat:e.target.value})} style={s} />
          </div>
          <button onClick={add} style={{padding:'10px 20px',background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>Qoshish</button>
        </div>
      </div>
      <div style={{background:'white',borderRadius:'12px',overflow:'auto',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white'}}>
              {['Mijoz','Model','Rang','Uzunlik','Turi','Miqdor','Sana','Muddat','Stanok','Holat'].map(h => (
                <th key={h} style={{padding:'12px',border:'1px solid #e5e7eb'}}> {h} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{borderBottom:'1px solid #ede9fe'}}>
                <td style={{padding:'10px'}}>{o.mijoz}</td>
                <td style={{padding:'10px'}}>{o.model}</td>
                <td style={{padding:'10px'}}>{o.rang}</td>
                <td style={{padding:'10px'}}>{o.uzunlik} m</td>
                <td style={{padding:'10px'}}>{o.turi}</td>
                <td style={{padding:'10px'}}>{o.miqdor_kilo}</td>
                <td style={{padding:'10px'}}>{o.sana}</td>
                <td style={{padding:'10px'}}>{o.muddat}</td>
                <td style={{padding:'10px'}}>
                  <select value={o.stanok_id||''} onChange={e => update(o.id,o.holat,e.target.value)} style={{padding:'4px',borderRadius:'6px',border:'1px solid #c4b5fd'}}>
                    <option value="">-</option>
                    {machines.map(m => <option key={m.id} value={m.id}>{m.nomi}</option>)}
                  </select>
                </td>
                <td style={{padding:'10px'}}>
                  <select value={o.holat} onChange={e => update(o.id,e.target.value,o.stanok_id)} style={{padding:'4px',borderRadius:'6px',border:'1px solid #c4b5fd'}}>
                    <option value="kutilmoqda">Kutilmoqda</option>
                    <option value="bajarilmoqda">Bajarilmoqda</option>
                    <option value="tayyor">Tayyor</option>
                    <option value="bekor">Bekor</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;