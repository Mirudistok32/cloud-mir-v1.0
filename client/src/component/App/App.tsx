import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormRegistration } from '../FormRegistration/FormRegistration';
import { Navbar } from '../Navbar/Navbar';
import { FormRegistrationType } from '../FormRegistration/FormRegistration'
import { FormLogin } from '../FormLogin/FormLogin'
import s from './App.module.scss';
import { authAPI, loginAPI, registrationAPI } from '../../api/users-api'
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { Disk } from '../Disk/Disk'

function App() {

  const dispatch = useDispatch()
  const isAuth = useSelector((state: AppStateType) => state.userReducer.isAuth)
  const onSubmitFormRegistration = (values: FormRegistrationType) => {
    const { email, password } = values
    registrationAPI(email, password)
  }
  const onSubmitFormLogin = (values: FormRegistrationType) => {
    const { email, password } = values
    dispatch(loginAPI(email, password))
  }

  useEffect(() => {
    dispatch(authAPI())
  }, [dispatch])

  return (
    <div className={s.app}>
      <div className={s.app__container}>
        <Navbar />
        <div className={s.app__switch}>
          {
            !isAuth ?
              <Switch>
                <Route path="/registration" render={() => <FormRegistration onSubmit={onSubmitFormRegistration} />} />
                <Route path="/login" render={() => <FormLogin onSubmit={onSubmitFormLogin} />} />
                <Redirect to="/login" />
              </Switch>
              :
              <Switch>
                <Route path="/" render={() => <Disk />} />
                <Redirect to="/" />
              </Switch>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
