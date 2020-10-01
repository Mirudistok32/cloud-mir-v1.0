import React from 'react';
import { Switch } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import s from './App.module.scss';

function App() {
  return (
    <div className={s.app}>
      <Navbar />
      <Switch>
        
      </Switch>
    </div>
  );
}

export default App;
