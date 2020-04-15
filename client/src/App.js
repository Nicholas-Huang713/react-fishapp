import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div className="App">
      <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute>
              {/* <Route path="/welcome" component={Welcome} /> */}
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/editprofile" component={EditProfile} />
              {/* <Route path="/album" component={Album} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/admin" component={Admin} /> */}
            </PrivateRoute>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
