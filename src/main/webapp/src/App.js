import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import Topup from './topup';
import Pay from './pay';
import PrivateRoute from "./module/private.route";

class App extends Component {
    render() {
        return (
                <Router>
                    <Switch>
                    <Route path={["/", "/login"]} exact={true} component={Login}/>
                    <Route path='/register' exact={true} component={Register}/>                
                    <PrivateRoute path='/home' exact={true} component={Home}/>
                    <PrivateRoute path='/topup' exact={true} component={Topup}/>
                    <PrivateRoute path='/pay' exact={true} component={Pay}/>
                    </Switch>
                </Router>
                );
    }
}
;

export default App;