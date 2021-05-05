import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import ConfirmarCuenta from './components/ConfirmarCuenta'
import CrearCitas from './components/CrearCitas';
const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/' component={CrearCitas}/>
            <Route path='/confirmacion'  component={ConfirmarCuenta}/>
        </Switch>
    );
}

export default Routes;