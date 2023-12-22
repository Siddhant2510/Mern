import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';

function BarTransaction() {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState('March');

  useEffect(() => {
    // Fetch data from your API
    axios.get(`http://localhost:3000/transaction/barTransaction?month=${month}`)
      .then(response => {
        const data = Object.keys(response.data).map(key => ({
          name: key,
          value: response.data[key]
        }));
        setChartData(data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [month]);

  return (
    <div>
      <h1>Bar Chart Stats - {month}</h1>
      <label>
        Select month:
        <select value={month} onChange={e => setMonth(e.target.value)}>
          {/* Your month options */}
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
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default BarTransaction;
