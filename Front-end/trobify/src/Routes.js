import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import ConfirmarCuenta from './components/ConfirmarCuenta'
import PublicarPropiedad from './components/PublicarPropiedad'

const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/confirmacion'  component={ConfirmarCuenta}/>
            <Route path='/property_insert' component={PublicarPropiedad}/>
        </Switch>
    );
}

export default Routes;