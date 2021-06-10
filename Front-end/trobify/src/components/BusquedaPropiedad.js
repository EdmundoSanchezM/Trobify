import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";
import { GoogleMapsAPI } from '../credentials';

class BusquedaPropiedad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    contieneNumero = (address) => {
        return /\d/.test(address);//Google no da CP si es una delegacion la que se busco, deberitas que si deberitas
    }

    buscarCP = (addressArray) => {
        let cp = 0
        addressArray.forEach(function (element) {
            let contenido = element.long_name
            if (!isNaN(parseInt(contenido))) {
                if (contenido.length == 5) {//Tenemos un CP
                    cp = contenido
                }
            }
        });
        return cp
    }

    onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components
        if (!(typeof address === 'undefined')) {
            if (!this.contieneNumero(address)) {//Zona grande, sin CP
                localStorage.setItem('dato', addressArray[0].long_name)
            } else {//Google nos esta dando un CP, mas facil >:)
                localStorage.setItem('dato', this.buscarCP(addressArray))
            }
            localStorage.setItem('stop_aux',10)
            this.setState({ redirect: true })
        }
    };

    render() {
        const { redirect } = this.state;
        var page = window.location.href;
        if (redirect) {
            if (page.includes("map_properties")){
                window.location.reload(false);
            }else
                return <Redirect to={{
                pathname: '/map_properties',
            }} />;
        }

        return (
            <div class="navbar-item field" >
                <p class="control has-icons-right">
                    <Autocomplete
                        options={{
                            types: "(regions)",
                            componentRestrictions: { country: "mx" },
                        }}
                        onPlaceSelected={this.onPlaceSelected}
                        placeholder="¿Qué estas buscando?"
                        class="input"
                        size="70"
                    />
                    <span class="icon is-small is-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ddd" d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" /></svg>
                    </span>
                </p>

            </div>
        )

    }
}

export default BusquedaPropiedad