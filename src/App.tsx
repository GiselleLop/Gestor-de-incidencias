import { useState } from 'react';
import { Route, Redirect, useLocation  } from 'wouter';
import Home from './Home';
import Admin from './Admin';
import Resident from './Resident';
import Header from './Header';

function App() {
    const [location, setLocation] = useLocation();

    const showBackButton = location === '/admin' || location === '/resident';

  return (
    <div>       
    <Header showHomeButton={showBackButton} onBack={() => {
      setLocation('/home');
    }
   } />

     <Route path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/admin">
        <Admin/>
      </Route>
      <Route path="/resident">
        <Resident/>
      </Route>
    </div>
  );
}

export default App;
