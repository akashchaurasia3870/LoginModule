import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/authPages/SignUp';
import SignIn from './pages/authPages/SignIn';
import ResetPassword from './pages/authPages/ResetPassword';
import VerifyOTP from './pages/authPages/VerifyOTP';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/password-reset" component={ResetPassword} />
        <Route path="/verify-otp" component={VerifyOTP} />
      </Switch>
    </Router>
  );
};

export default App;
