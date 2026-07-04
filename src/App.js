import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Workers from './pages/Workers';
import Machines from './pages/Machines';
import Orders from './pages/Orders';
import Warehouse from './pages/Warehouse';
import Salary from './pages/Salary';
import Attendance from './pages/Attendance';
import Production from './pages/Production';

function App() {
  const [page, setPage] = useState('dashboard');

  function renderPage() {
    if (page === 'dashboard') return <Dashboard />;
    if (page === 'workers') return <Workers />;
    if (page === 'machines') return <Machines />;
    if (page === 'orders') return <Orders />;
    if (page === 'attendance') return <Attendance />;
    if (page === 'production') return <Production />;
    if (page === 'warehouse') return <Warehouse />;
    if (page === 'salary') return <Salary />;
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',fontFamily:'Arial'}}>
      <div style={{width:'220px',background:'#1a1a2e',color:'white',padding:'20px'}}>
        <h2 style={{color:'#6366f1',marginBottom:'30px'}}>Tubo Textil</h2>
        <ul style={{listStyle:'none',padding:0}}>
          {[
            {id:'dashboard',label:'📊 Dashboard'},
            {id:'workers',label:'👷 Ishchilar'},
            {id:'machines',label:'⚙️ Stanoklar'},
            {id:'orders',label:'📋 Buyurtmalar'},
            {id:'attendance',label:'📅 Davomat'},
            {id:'production',label:'🏭 Ishlab chiqarish'},
            {id:'warehouse',label:'📦 Ombor'},
            {id:'salary',label:'💰 Maosh'},
          ].map(item => (
            <li key={item.id} onClick={() => setPage(item.id)}
              style={{padding:'12px',marginBottom:'8px',cursor:'pointer',borderRadius:'8px',background:page===item.id?'#6366f1':'transparent'}}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div style={{flex:1,padding:'30px',background:'#eef2ff'}}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;