import React, { Component, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from 'components/Navbar';
import Map from 'components/MapInfo'
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import DateTimePicker from 'react-datetime-picker'
import UserData from 'UserProfile';

class Vercitas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citas: [],
            info_citas: []
        };
        this.eliminarCita = this.eliminarCita.bind(this);
    }
    componentDidMount() {
        const usuario = UserData.getName();
        if (usuario == null) {
            Swal.fire({
                title: 'Lo siento, no ha ingresado a la plataforma',
                text: 'Porfavor ingrese a la plataforma :)',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    window.location.replace("/");
                }
            });
        } else {
            var formData = new FormData();
            formData.append('Correo', UserData.getEmail());
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/user/view_dates",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(response =>
                    this.setState({ citas: Array.from(Object.keys(response.data)), info_citas: Array.from(Object.values(response.data)) })

                )
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

    }
    eliminarCita = (solicitante, direccion) => {
        var formData = new FormData();
        formData.append('solicitante', solicitante);
        formData.append('direccion', direccion);
        axios({
            method: "post",
            url: "http://127.0.0.1:5000/user/delete_dates",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Cita eliminada con éxito',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(function (isConfirm) {
                        if (isConfirm) {
                            window.location.reload();
                        }
                    });
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
                <Navbar /><Section>
                    <div className="container has-text-centered">
                        <Heading title>Peticiones de citas</Heading>
                    </div>
                    <br></br>
                    <div className="columns is-centered">
                        <div className="column">
                            <table className="table" style={{
                             marginLeft: 'auto',
                             marginRight:'auto'
                            }}>
                                <thead>
                                    <tr>
                                        <th>Correo del interesado</th>
                                        <th>Fecha y hora de la cita solicitada</th>
                                        <th>Dirección de la casa de la cita</th>
                                        <th>Eliminar cita</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.citas.map((citas, index) => {
                                        let data = this.state.info_citas[index].split('*')
                                        const event = new Date(data[1])
                                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                                        return (
                                            <tr>
                                                <td>{data[0]}</td>
                                                <td>{event.toLocaleDateString('es-ES', options) + " " + event.toLocaleTimeString('es-ES')}</td>
                                                <td>{data[2]}</td>
                                                <td><button class="button is-danger" onClick={this.eliminarCita.bind(this, data[0], data[2])}>Eliminar cita</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Section>
            </div>
        )
    }
}

export default Vercitas;