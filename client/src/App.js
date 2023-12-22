
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicTransaction from './components/BasicTransaction';
import StatTransaction from './components/StatTransaction';
import BarTransaction from './components/BarTransaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transaction/basicTransaction" element={<BasicTransaction />} />
        <Route path="/transaction/stat" element={<StatTransaction />} />
        <Route path="/transaction/bar" element={<BarTransaction />} />
      </Routes>
</Router>
  );
}

export default App;
