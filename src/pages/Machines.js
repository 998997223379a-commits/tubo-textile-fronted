import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Machines() {
  const [machines, setMachines] = useState([]);
  const [form, setForm] = useState({ nomi: '', turi: '' });

  useEffect(() => {
    axios.get('http://tubo-textile-backend.onrender.com/api/machines')
      .then(res => setMachines(res.data))
      .catch(err => console.log(err));
  }, []);

  const addMachine = () => {
    axios.post('http://tubo-textile-backend.onrender.com/api/machines', form)
      .then(res => {
        setMachines([...machines, res.data]);
        setForm({ nomi: '', turi: '' });
      });
  };

  const changeStatus = (id, holat) => {
    axios.put('http://tubo-textile-backend.onrender.com/api/machines/' + id, { holat })
      .then(() => {
        setMachines(machines.map(m => m.id === id ? { ...m, holat } : m));
      });
  };

  const getColor = (holat) => {
    if (holat === 'ishlayapti') return '#28a745';
    if (holat === 'nosoz') return '#dc3545';
    return '#ffc107';
  };

  return (
    <div>
      <h2>⚙️ Stanoklar</h2>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Yangi stanok qo'shish</h3>
        <input placeholder="Stanok nomi" value={form.nomi}
          onChange={e => setForm({ ...form, nomi: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input placeholder="Turi" value={form.turi}
          onChange={e => setForm({ ...form, turi: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button onClick={addMachine}
          style={{ padding: '8px 16px', background: '#e94560', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Qo'shish
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
        {machines.map((m) => (
          <div key={m.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', borderTop: '4px solid ' + getColor(m.holat) }}>
            <h4 style={{ margin: '0 0 5px 0' }}>{m.nomi}</h4>
            <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '12px' }}>{m.turi}</p>
            <span style={{ background: getColor(m.holat), color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' }}>
              {m.holat}
            </span>
            <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
              <button onClick={() => changeStatus(m.id, 'ishlayapti')}
                style={{ flex: 1, padding: '4px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
                Ishlayapti
              </button>
              <button onClick={() => changeStatus(m.id, 'nosoz')}
                style={{ flex: 1, padding: '4px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
                Nosoz
              </button>
              <button onClick={() => changeStatus(m.id, 'bosh')}
                style={{ flex: 1, padding: '4px', background: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
                Bo'sh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Machines;