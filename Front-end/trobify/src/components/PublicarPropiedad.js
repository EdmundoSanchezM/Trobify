import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import userData from 'UserProfile'
import Navbar from 'components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'
import Map from 'components/Map'
import Heading from 'react-bulma-components/lib/components/heading';
import UserData from 'UserProfile';

class PublicarPropiedad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banimg: false,
            dataImagen: '',
            arrayImg: [],
            nombre: '',
            estado: 'renta',
            terreno: '',
            construccion: '',
            habitaciones: '',
            sanitarios: '',
            estacionamientos: '',
            referencias: '',
            precio: '',
            statusForm: [true, true, true, true, true, true, true, true]
        };
        this.handleFiles = this.handleFiles.bind(this);
    }

    componentDidMount() {
        const usuario = userData.getName();
        if (usuario == null)
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
    }

    allLoaded = (imagesArr) => {
        var element = document.getElementById("images-property");
        element.innerHTML = ""
        const images = imagesArr
        for (var i = 0; i < images.length; i++) {
            var div = document.createElement("div");
            div.className = "column is-one-third";
            var img = document.createElement("img");
            img.src = images[i].src;
            div.appendChild(img);
            element.appendChild(div)
        }
    }

    handleFiles = (e) => {
        console.clear()
        var urlsImg = this.state.arrayImg
        if (urlsImg.length > 2) {
            Swal.fire({
                title: 'Maximo de imagenes alcanzado',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return true
        }
        urlsImg.push(URL.createObjectURL(e.target.files[0]))
        var imagesArr = []
        var imagecount = 0
        urlsImg.forEach(src => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                imagecount += 1
                if (imagecount === urlsImg.length) {
                    this.setState({ arrayImg: urlsImg, dataImagen: e.target.files[0] },
                        this.allLoaded(imagesArr)
                    )
                }
            }
            imagesArr.push(image)
        });
        this.setState({ banimg: true })
    }

    hacerRegistro = async () => {
        var direccion = '', lat = '', lon = ''
        direccion = document.getElementById("address").value
        lat = document.getElementById("lat").value
        lon = document.getElementById("lon").value
        var arrForm = this.state.statusForm
        var boolArray = arrForm[0]
        for (var i = 1; i < arrForm.length - 1; i++)
            boolArray = boolArray && arrForm[i]
        if (boolArray) {
            if (this.state.precio!==0&&this.state.terreno.length !== 0 && this.state.construccion.length !== 0 && this.state.habitaciones.length !== 0 && this.state.sanitarios.length !== 0 && this.state.estacionamientos.length !== 0 && this.state.banimg) {
                var formData = new FormData();
                formData.append('Propietario', UserData.getEmail());
                formData.append('Nombre', this.state.estado);
                formData.append('Direccion', direccion);
                formData.append('Latitud', lat);
                formData.append('Longitud', lon);
                formData.append('Terreno', this.state.terreno);
                formData.append('Construccion', this.state.construccion);
                formData.append('Habitaciones', this.state.habitaciones);
                formData.append('Sanitarios', this.state.sanitarios);
                formData.append('Estacionamiento', this.state.estacionamientos);
                formData.append('Descripcion', this.state.referencias);
                formData.append('Precio', this.state.precio);
                let blob = await fetch(this.state.arrayImg[0]).then(r => r.blob());
                formData.append('imgpropiedad', blob);
                console.log(lat);
                console.log(lon);
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/user/altaPropiedad",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        if (response.status === 201)
                            Swal.fire({
                                title: 'Registro realizado con exito',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            }).then(function (isConfirm) {
                                if (isConfirm) {
                                    window.location.href = '/'
                                }
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
                                text: 'Ocurrrio un error en el servidor',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            })
                    });
            } else {
                Swal.fire({
                    title: 'Faltan campos que llenar',
                    text: 'Porfavor de terminar el formulario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }


        }

    }
    manejadorPropietario = (event) => {
        this.setState({
            nombre: event.target.value
        })
    }
    manejadorEstado = (event) => {
        this.setState({
            estado: event.target.value
        })
    }
    manejadorTerreno = (e) => {
        const re = /^\d+(.\d{0,2})?$/
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ terreno: e.target.value })
        }

    }
    manejadorConstruccion = (e) => {
        const re = /^\d+(.\d{0,2})?$/
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                construccion: e.target.value
            })
        }

    }
    manejadorPrecio = (e) => {
        const re = /^\d+(.\d{0,2})?$/
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                precio: e.target.value
            })
        }

    }
    manejadorHabitaciones = (e) => {
        const re = /^[0-9\b]+$/
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                habitaciones: e.target.value
            })
        }

    }
    manejadorSanitarios = (e) => {
        const re = /^[0-9\b]+$/
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                sanitarios: e.target.value
            })
        }

    }
    manejadorEstacionamiento = (e) => {
        const re = /^[0-9\b]+$/
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                estacionamientos: e.target.value
            })
        }
    }
    manejadorReferencias = (e) => {
        this.setState({
            referencias: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container has-text-centered">
                    <Heading>Registrar Propiedad</Heading>
                </div>
                <Section>
                    <Columns>
                        <Columns.Column size="half">
                            <div className="container has-text-centered">
                                <Heading subtitle>Información de la propiedad</Heading>
                                <br></br>
                            </div>
                            <div className="columns is-multiline">
                                <div className="column field">
                                    <label className="label">Estado de la propiedad</label>
                                    <div className="select">
                                        <select value={this.state.estado} onChange={this.manejadorEstado}>
                                            <option class="option" value="renta">Renta</option>
                                            <option class="option" value="venta">Venta</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="column field">
                                    <label className="label">m<sup>2</sup> de terreno</label>
                                    <input className="input" type="text" placeholder="m^2 de terreno" value={this.state.terreno} onChange={this.manejadorTerreno} />
                                </div>
                                <div className="column field">
                                    <label class="label">m<sup>2</sup>  de construccion</label>
                                    <input class="input" type="text" placeholder="m^2 de construccion" value={this.state.construccion} onChange={this.manejadorConstruccion} />
                                </div>

                            </div>
                            <div className="columns is-multiline">
                                <div className="column field">
                                    <label class="label">Número de habitaciones</label>
                                    <input class="input" type="text" placeholder="Número de habitaciones" value={this.state.habitaciones} onChange={this.manejadorHabitaciones} />
                                </div>
                                <div className="column field">
                                    <label class="label">Número de sanitarios</label>
                                    <input class="input" type="text" placeholder="Número de sanitarios" value={this.state.sanitarios} onChange={this.manejadorSanitarios} />
                                </div>
                                <div className="column field">
                                    <label class="label">Número de estacionamientos</label>
                                    <input class="input" type="text" placeholder="Número de estacionamientos" value={this.state.estacionamientos} onChange={this.manejadorEstacionamiento} />
                                </div>
                            </div>
                            <div>
                                <div class="field">
                                    <label class="label">Referencias adicionales</label>
                                    <div class="control">
                                        <textarea class="textarea" type="text" placeholder="Referencias adicionales" onChange={this.manejadorReferencias} />
                                    </div>
                                </div>
                            </div>

                            <div className="container has-text-centered">
                                <label class="label">Imágenes de la Propiedad</label>
                            </div>
                            <div class="content is-centered">
                                <div class="file has-name">
                                    <label class="file-label">
                                        <input class="file-input" accept="image/*" id="file-upload" type="file" name="resume" onChange={this.handleFiles.bind(this)} />
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fa fa-upload"></i>
                                            </span>
                                        </span>
                                        <span for="file-upload" id="file-upload-filename" class="file-name">
                                            {this.state.dataImagen.name}
                                        </span>
                                        <br />
                                    </label>
                                </div>
                                <hr></hr>
                                <div id="images-property" class="columns is-multiline has-background-info	">
                                </div>
                            </div>
                            <div>
                                <div class="box has-text-centered">
                                    <button class="button is-primary" onClick={this.hacerRegistro}>Anunciar propiedad</button>
                                </div>
                            </div>

                        </Columns.Column>
                        <Columns.Column>
                            <div className="container has-text-centered">
                                <Heading subtitle>Dirección de la propiedad</Heading>
                            </div>
                            <div className=" field">
                                    <label class="label">Precio de la casa en pesos mexicanos</label>
                                    <input class="input" type="text" placeholder="Número de estacionamientos" value={this.state.precio} onChange={this.manejadorPrecio} />
                            </div>
                            <Map
                                google={this.props.google}
                                center={{ lat: 19.432777, lng: -99.133217 }}
                                height="50vh"
                                zoom={15}
                            />
                            <hr></hr>
                        </Columns.Column>
                    </Columns>
                </Section>
            </div>
        )
    }
}

export default PublicarPropiedad;