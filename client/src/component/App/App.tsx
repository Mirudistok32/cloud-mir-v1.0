import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormRegistration } from '../FormRegistration/FormRegistration';
import { Navbar } from '../Navbar/Navbar';
import { FormRegistrationType } from '../FormRegistration/FormRegistration'
import s from './App.module.scss';

function App() {

  const onSubmitFormRegistration = (values: FormRegistrationType) => {

  }

  return (
    <div className={s.app}>
      <div className={s.app__container}>
        <Navbar />
        <div className={s.app__switch}>
          <Switch>
            <Route path="/registration" render={() => <FormRegistration onSubmit={onSubmitFormRegistration} />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
