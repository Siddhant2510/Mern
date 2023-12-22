import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BasicTransaction.css'

function BasicTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch transactions from your API
    axios.get(`http://localhost:3000/transaction/basicTransaction?month=${month}&search=${search}`)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions', error);
      });
  }, [month, search]);

  return (
    <div className='dashboard'>
      <div className='title-section'>
        <h1>Transaction Dashboard</h1>
      </div>
      <div className='filters'>
        

        <label>
            Search:
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </label>

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
    </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold}</td>
              <td>{transaction.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BasicTransaction;
