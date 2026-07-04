import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [form, setForm] = useState({ ism: '', telefon: '', smena: 1 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/workers')
      .then(res => setWorkers(res.data))
      .catch(err => console.log(err));
  }, []);

  const addWorker = () => {
    axios.post('http://localhost:5000/api/workers', form)
      .then(res => {
        setWorkers([...workers, res.data]);
        setForm({ ism: '', telefon: '', smena: 1 });
      });
  };

  return (
    <div>
      <h2>👷 Ishchilar</h2>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Yangi ishchi qo'shish</h3>
        <input placeholder="Ism" value={form.ism}
          onChange={e => setForm({ ...form, ism: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input placeholder="Telefon" value={form.telefon}
          onChange={e => setForm({ ...form, telefon: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <select value={form.smena}
          onChange={e => setForm({ ...form, smena: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value={1}>1-smena</option>
          <option value={2}>2-smena</option>
        </select>
        <button onClick={addWorker}
          style={{ padding: '8px 16px', background: '#e94560', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Qo'shish
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1a1a2e', color: 'white' }}>
              <th style={{ padding: '12px' }}>Ism</th>
              <th style={{ padding: '12px' }}>Telefon</th>
              <th style={{ padding: '12px' }}>Smena</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{w.ism}</td>
                <td style={{ padding: '12px' }}>{w.telefon}</td>
                <td style={{ padding: '12px' }}>{w.smena}-smena</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workers;