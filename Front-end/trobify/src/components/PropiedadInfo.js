import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from 'components/Navbar';
import Map from 'components/MapInfo'
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import DateTimePicker from 'react-datetime-picker'
import UserData from 'UserProfile';

class PropiedadInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Propietario: '',
            Estado: '',
            Direccion: '',
            Terreno: '',
            Construccion: '',
            NumHabitacion: '',
            NumSanitario: '',
            NumEstacionamiento: '',
            Descripcion: '',
            Imagen: '',
            Lat: '',
            Lng: '',
            value: '',
            Precio: ''
        };
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
            formData.append('Lat', this.props.location.state.Lat);
            formData.append('Lng', this.props.location.state.Lng);
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/property/info",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(response =>
                    this.setState({
                        Propietario: response.data.Propietario,
                        Estado: response.data.Estado,
                        Direccion: response.data.Direccion,
                        Terreno: response.data.Terreno,
                        Construccion: response.data.Construccion,
                        NumHabitacion: response.data.NumHabitacion,
                        NumSanitario: response.data.NumSanitario,
                        NumEstacionamiento: response.data.NumEstacionamiento,
                        Descripcion: response.data.Descripcion,
                        Imagen: response.data.Imagen,
                        Lat: this.props.location.state.Lat,
                        Lng: this.props.location.state.Lng,
                        Precio: response.data.Precio,
                        Cita: new Date()
                    })
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

    changeCalendar = (event) => {
        const actualDate = new Date()
        if (actualDate <= event)
            this.setState({ Cita: event })
    }
    hacerRegistro = () => {
        const actualDate = new Date()
        let latfix = this.state.Lat;
        let lngfix = this.state.Lng;
        if (this.state.Lat > 12) {
            latfix = this.state.Lat.toFixed(12);
            lngfix = this.state.Lng.toFixed(12);
        }
        if (actualDate < this.state.Cita) {
            var formData = new FormData();
            formData.append('Solicitante', UserData.getEmail());
            formData.append('Latitud', latfix);
            formData.append('Longitud', lngfix);
            formData.append('Fecha_hora', this.state.Cita);
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/property/date",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    if (response.status === 201)
                        Swal.fire({
                            title: 'Cita solicitada con éxito',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(function (isConfirm) {
                            window.location.href = '/'
                        });
                })
                .catch(function (response) {
                    if (response["response"].status === 460)
                        Swal.fire({
                            title: 'El registro no se pudo completar',
                            text: 'La propiedad ya ha sido registrada anteriormente',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                    else
                        Swal.fire({
                            title: 'El registro no se pudo completar',
                            text: 'Ocurrio un error en el servidor',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                });
        } else {
            Swal.fire({
                title: 'Cita incorrecta',
                text: 'Porfavor de elegir fecha y hora futuras',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }


    }
    render() {

        return (
            <div>
                <Navbar /><Section>
                    <Columns>
                        <Columns.Column size="half">
                            <div className="container has-text-centered">
                                <Heading subtitle>Información de la propiedad</Heading>
                            </div>
                            <br></br>
                            <div className="columns is-centered">
                                <div className="column field">
                                    <label className="label has-text-centered">Dirección</label>
                                    <div className="control">
                                        <input className="input" type="text" value={this.state.Direccion} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="column field">
                                    <p className="has-text-centered"><strong>Precio: </strong>  ${this.state.Precio} (MXN) </p>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="column">
                                    <p className="has-text-centered"><strong>Metros cuadrados de terreno:</strong>  {this.state.Terreno} m<sup>2</sup> </p>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="column">
                                    <p className="has-text-centered"><strong>Metros cuadrados de construcción:</strong>  {this.state.Construccion} m<sup>2</sup> </p>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="column">
                                    <p className="has-text-centered"><strong>Numero de habitaciones:</strong>  {this.state.NumHabitacion} </p>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="column">
                                    <p className="has-text-centered"><strong>Numero de sanitarios:</strong>  {this.state.NumSanitario} </p>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="column">
                                    <p className="has-text-centered"><strong>Numero de estacionamientos:</strong>  {this.state.NumEstacionamiento} </p>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="column">
                                    <p className="has-text-centered"><strong>Descripcion</strong> </p>
                                    <div class="control">
                                        <textarea class="textarea" readOnly value={this.state.Descripcion}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div id="images-property" className="columns is-multiline has-background-info">
                                <div className="column is-one-third">
                                    <img style={{
                                        content: `url(data:image/png;base64,${this.state.Imagen}) `,
                                    }} alt="casa"></img>
                                </div>
                            </div>

                        </Columns.Column>
                        <Columns.Column>
                            <div className=" has-text-centered">
                                <Heading subtitle>Dirección de la propiedad</Heading>
                            </div>
                            <br></br>
                            <Map
                                google={this.props.google}
                                center={{ lat: this.props.location.state.Lat, lng: this.props.location.state.Lng }}
                                height="50vh"
                                zoom={17}
                            />
                            <hr></hr>
                            <div className=" has-text-centered">
                                <Heading subtitle>Hacer cita</Heading>
                            </div>
                            <br></br>
                            <div className="columns is-centered">
                                <div class="column has-text-centered is-2">
                                    <DateTimePicker
                                        onChange={this.changeCalendar}
                                        value={this.state.Cita}
                                    />
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div class="column has-text-centered is-2">
                                    <button class="button is-primary" onClick={this.hacerRegistro}>Solicitar cita</button>
                                </div>
                            </div>
                        </Columns.Column>
                    </Columns>
                </Section>
            </div>
        )
    }
}

export default PropiedadInfo;