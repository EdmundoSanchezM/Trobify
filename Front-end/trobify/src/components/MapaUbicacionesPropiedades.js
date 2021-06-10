import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import Navbar from 'components/Navbar';

import Map from 'components/MapPropiedades'
import Heading from 'react-bulma-components/lib/components/heading';

class MapaUbicacionesPropiedades extends Component {
    constructor() {
        super();
    };
    forceUpdateHandler() {
        alert('Hola')
        this.forceUpdate();
    };

    componentDidMount() {
        let dato = localStorage.getItem('dato')
        let stop_aux = localStorage.getItem('stop_aux')
        var formData = new FormData();
        formData.append('buscar', dato);
        axios({
            method: "post",
            url: "http://127.0.0.1:5000/search",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                if (response.status === 200) {
                    const propiedadesdata = response.data;
                    var direcciones_data = Array.from(Object.keys(propiedadesdata))
                    var coordenadas_data = Array.from(Object.values(propiedadesdata))
                    localStorage.setItem('direcciones_data', JSON.stringify(direcciones_data))
                    localStorage.setItem('coordenadas_data', JSON.stringify(coordenadas_data))
                    if (direcciones_data.length === 0) {
                        Swal.fire({
                            title: 'No hay propiedades',
                            text: 'Lo siento, no hay propiedades :c',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                        localStorage.removeItem('direcciones_data')
                        localStorage.removeItem('coordenadas_data')
                    } else {
                        if (response.status === 200 && stop_aux != 77)
                            Swal.fire({
                                title: 'Propiedades encontradas',
                                text: 'Se mostraran las propiedades en el mapa, asi como caracteristicas',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            }).then(function (isConfirm) {
                                if (isConfirm && stop_aux == 10) {
                                    window.location.reload();
                                    localStorage.setItem("stop_aux", 77)
                                }
                            });
                    }

                }
            })
            .catch(function (response) {
                if (response.status === 460)
                    Swal.fire({
                        title: 'El registro no se pudo completar',
                        text: 'El correo que se intento usar ya esta en uso, use un correo diferente',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
            });
    }
    render() {
        return (
            <div>
                <Navbar /><div class="container is-fluid">
                    <Map
                        google={this.props.google}
                        height="92vh"
                        zoom={13}
                    />
                </div>

            </div>
        )
    }
}

export default MapaUbicacionesPropiedades;