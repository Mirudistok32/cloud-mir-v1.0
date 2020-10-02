import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormRegistration } from '../FormRegistration/FormRegistration';
import { Navbar } from '../Navbar/Navbar';
import s from './App.module.scss';

function App() {
  return (
    <div className={s.app}>
      <div className={s.app__container}>
        <Navbar />
        <div className={s.app__switch}>
          <Switch>
            <Route path="/registration" render={() => <FormRegistration />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
