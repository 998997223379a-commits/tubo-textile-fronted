import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [workers, setWorkers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
http://tubo-textile-backend.onrender.com
    axios.get('http://tubo-textile-backend.onrender.com/api/machines').then(r => setMachines(r.data));
    axios.get('http://tubo-textile-backend.onrender.com/api/orders').then(r => setOrders(r.data));
    axios.get('http://tubo-textile-backend.onrender.com/api/warehouse').then(r => setWarehouse(r.data));
    axios.get('http://tubo-textile-backend.onrender.com/api/salary').then(r => setSalaries(r.data));
  }, []);

  const ishlayapti = machines.filter(m => m.holat === 'ishlayapti').length;
  const nosoz = machines.filter(m => m.holat === 'nosoz').length;
  const bosh = machines.filter(m => m.holat === 'bosh').length;
  const kutilmoqda = orders.filter(o => o.holat === 'kutilmoqda').length;
  const bajarilmoqda = orders.filter(o => o.holat === 'bajarilmoqda').length;
  const tayyor = orders.filter(o => o.holat === 'tayyor').length;
  const kamOmbor = warehouse.filter(w => w.miqdor < 10);

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px',marginBottom:'24px'}}>
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',borderTop:'4px solid #6366f1'}}>
          <p style={{color:'#888',fontSize:'13px'}}>Ishchilar</p>
          <h2 style={{color:'#6366f1',fontSize:'32px'}}>{workers.length}</h2>
        </div>
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',borderTop:'4px solid #8b5cf6'}}>
          <p style={{color:'#888',fontSize:'13px'}}>Stanoklar</p>
          <h2 style={{color:'#8b5cf6',fontSize:'32px'}}>{machines.length}</h2>
          <p style={{color:'#aaa',fontSize:'12px'}}>{ishlayapti} ta ishlayapti</p>
        </div>
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',borderTop:'4px solid #06b6d4'}}>
          <p style={{color:'#888',fontSize:'13px'}}>Buyurtmalar</p>
          <h2 style={{color:'#06b6d4',fontSize:'32px'}}>{orders.length}</h2>
          <p style={{color:'#aaa',fontSize:'12px'}}>{bajarilmoqda} ta jarayonda</p>
        </div>
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',borderTop:'4px solid #10b981'}}>
          <p style={{color:'#888',fontSize:'13px'}}>Ombor</p>
          <h2 style={{color:'#10b981',fontSize:'32px'}}>{warehouse.length}</h2>
          <p style={{color:'#aaa',fontSize:'12px'}}>{kamOmbor.length} ta kam qolgan</p>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px',marginBottom:'24px'}}>
        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
          <h3 style={{marginBottom:'16px',color:'#4f46e5'}}>Stanoklar holati</h3>
          <div style={{display:'flex',gap:'12px'}}>
            <div style={{flex:1,background:'#dcfce7',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:'28px',fontWeight:'bold',color:'#16a34a'}}>{ishlayapti}</div>
              <div style={{fontSize:'13px',color:'#16a34a'}}>Ishlayapti</div>
            </div>
            <div style={{flex:1,background:'#fee2e2',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:'28px',fontWeight:'bold',color:'#dc2626'}}>{nosoz}</div>
              <div style={{fontSize:'13px',color:'#dc2626'}}>Nosoz</div></div>
            <div style={{flex:1,background:'#fef9c3',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:'28px',fontWeight:'bold',color:'#ca8a04'}}>{bosh}</div>
              <div style={{fontSize:'13px',color:'#ca8a04'}}>Bosh</div>
            </div>
          </div>
        </div>

        <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
          <h3 style={{marginBottom:'16px',color:'#4f46e5'}}>Buyurtmalar holati</h3>
          <div style={{display:'flex',gap:'12px'}}>
            <div style={{flex:1,background:'#fef9c3',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:'28px',fontWeight:'bold',color:'#ca8a04'}}>{kutilmoqda}</div>
              <div style={{fontSize:'13px',color:'#ca8a04'}}>Kutilmoqda</div>
            </div>
            <div style={{flex:1,background:'#dbeafe',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:'28px',fontWeight:'bold',color:'#2563eb'}}>{bajarilmoqda}</div>
              <div style={{fontSize:'13px',color:'#2563eb'}}>Jarayonda</div>
            </div>
            <div style={{flex:1,background:'#dcfce7',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:'28px',fontWeight:'bold',color:'#16a34a'}}>{tayyor}</div>
              <div style={{fontSize:'13px',color:'#16a34a'}}>Tayyor</div>
            </div>
          </div>
        </div>
      </div>

      {kamOmbor.length > 0 && (
        <div style={{background:'#fff7ed',borderRadius:'12px',padding:'20px',marginBottom:'24px',border:'2px solid #fed7aa'}}>
          <h3 style={{color:'#ea580c',marginBottom:'12px'}}>Kam qolgan mahsulotlar</h3>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
            {kamOmbor.map(w => (
              <div key={w.id} style={{background:'white',borderRadius:'8px',padding:'10px 16px',border:'1px solid #fed7aa'}}>
                <strong style={{color:'#ea580c'}}>{w.nomi}</strong>
                <span style={{color:'#888',marginLeft:'8px'}}>{w.miqdor} {w.birlik}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{background:'white',borderRadius:'12px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <h3 style={{marginBottom:'16px',color:'#4f46e5'}}>Oxirgi maoshlar</h3>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'linear-gradient(90deg,#6366f1,#8b5cf6)',color:'white'}}>
              <th style={{padding:'10px'}}>Ishchi ID</th>
              <th style={{padding:'10px'}}>Oy</th>
              <th style={{padding:'10px'}}>Kilo</th>
              <th style={{padding:'10px'}}>Maosh</th>
            </tr>
          </thead>
          <tbody>
            {salaries.slice(-5).map(s => (
              <tr key={s.id} style={{borderBottom:'1px solid #ede9fe'}}>
                <td style={{padding:'10px'}}>{s.ishchi_id}</td>
                <td style={{padding:'10px'}}>{s.oy}</td>
                <td style={{padding:'10px'}}>{s.jami_kilo} kg</td>
                <td style={{padding:'10px',color:'#4f46e5',fontWeight:'bold'}}>{parseFloat(s.maosh).toLocaleString()} so'm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;