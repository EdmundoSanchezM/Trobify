import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import ConfirmarCuenta from './components/ConfirmarCuenta'
import PublicarPropiedad from './components/PublicarPropiedad'
import MapaUbicacionesPropiedades from './components/MapaUbicacionesPropiedades'
import PropiedadInfo from 'components/PropiedadInfo';
import Vercitas from 'components/Vercitas';
const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/confirmacion'  component={ConfirmarCuenta}/>
            <Route path='/property_insert' component={PublicarPropiedad}/>
            <Route path='/map_properties' component={MapaUbicacionesPropiedades}/>
            <Route path='/info_property' component={PropiedadInfo}/>
            <Route path='/view_dates' component={Vercitas}/>
        </Switch>
    );
}

export default Routes;