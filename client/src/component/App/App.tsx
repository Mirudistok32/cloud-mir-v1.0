import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import s from './App.module.scss';

function App() {
  return (
    <div className={s.app}>
      <Navbar />
    </div>
  );
}

export default App;
