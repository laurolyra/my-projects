import React from 'react';
import Table from './components/Table';
import SWProvider from './context/SWProvider';
import './App.css';

function App() {
  return (
    <SWProvider>
      <div className="App">
        <h1 data-testid="welcome">Star Wars Data Table: a Context/Hooks Saga!</h1>
        <Table />
      </div>
    </SWProvider>
  );
}

export default App;
