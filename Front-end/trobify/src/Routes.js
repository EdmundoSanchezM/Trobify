import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import ConfirmarCuenta from './components/ConfirmarCuenta'
import CrearCitas from './components/CrearCitas';
import PublicarPropiedad from './components/PublicarPropiedad'

const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/' component={CrearCitas}/>
            <Route path='/confirmacion'  component={ConfirmarCuenta}/>
            <Route path='/property_insert' component={PublicarPropiedad}/>
            <Route path='/create_date' component={CrearCitas}/>
        </Switch>
    );
}

export default Routes;