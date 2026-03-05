import React from 'react';
import Calculator from './Calculator';
import IncomeAndExpensesList from './IncExp';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">Basic React</header>
    <div className="app-body">
      <Calculator />
      <IncomeAndExpensesList />
    </div>
  </div>
);

export default App;
