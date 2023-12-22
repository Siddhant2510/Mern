import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatTransaction.css'

function StatTransaction() {
  const [stats, setStats] = useState({});
  const [month, setMonth] = useState('March');

  useEffect(() => {
    axios.get(`http://localhost:3000/transaction/statTransaction?month=${month}`)
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching stats', error);
      });
  }, [month]);

  return (
    <div>

    <label>
        Select month:
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
          
        </select>
      </label>
      <div className='stat-card'>
        <h1>Statistics - {month}</h1>
        <p>
            <span>Total sale:</span>
            <span>{stats.totalSaleAmount}</span> 
        </p>
        <p>
            <span>Total sold items:</span>
            <span>{stats.totalSoldItems}</span> 
        </p>
        <p>
            <span>Total not sold items:</span>
            <span>{stats.notSoldItems}</span> 
        </p>
      </div>
    </div>
  );
}

export default StatTransaction;
