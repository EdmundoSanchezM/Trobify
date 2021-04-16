import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import ConfirmarCuenta from './components/ConfirmarCuenta'
const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/confirmacion'  component={ConfirmarCuenta}/>
        </Switch>
    );
}

export default Routes;