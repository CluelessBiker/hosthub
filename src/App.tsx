import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className={'bodyContainer'}>
      <div className={'bodyInner'}>
        <Routes>
          <Route path={'/'} element={<></>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
