import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import userData from 'UserProfile'
import Navbar from 'components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'
import Map from 'components/Map'
import Heading from 'react-bulma-components/lib/components/heading';


class PublicarPropiedad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            dataImagen: '',
            arrayImg: [],
            countInputService: 1,
            countInputDataProperty: 1
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
        /*         if (urlWindow.pathname.includes("confirmacion")) {
                    const token = query.get('confirmation')
                    var formData = new FormData();
                    formData.append('mailConfirm', token);
                    axios({
                        method: "post",
                        url: "http://127.0.0.1:5000/user/confirmationMail",
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                        .then(function (response) {
                            if (response.status === 200) {
                                Swal.fire({
                                    title: 'Confirmación realizada con exito',
                                    text: 'Ahora pude ingresar a la plataforma :)',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                })
                                document.getElementById("opLeft").style.visibility = "hidden";
                                document.getElementById("ncorreoC").style.display = "none"
                                document.getElementById("correoC").style.display = "block"
                            }
                        })
                        .catch(function (response) {
                            if (response["response"].status === 460) {
                                Swal.fire({
                                    title: 'La confirmación no se pudo completar',
                                    text: 'El correo a confirmar no esta registrado',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })
                                document.getElementById("correoC").style.display = "none"
                                document.getElementById("ncorreoC").style.display = "block"
                            } else if (response["response"].status === 461) {
                                Swal.fire({
                                    title: 'Correo ya confirmado',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                })
                                document.getElementById("opLeft").style.visibility = "hidden";
                                document.getElementById("ncorreoC").style.display = "none"
                                document.getElementById("correoC").style.display = "block"
                            }
                            else {
                                Swal.fire({
                                    title: 'La confirmación no se pudo completar',
                                    text: 'Ocurrrio un error en el servidor',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })
                                document.getElementById("correoC").style.display = "none"
                                document.getElementById("ncorreoC").style.display = "block"
                            }
                        });
                }
         */
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
    }

    addInput = (typeInput) => {
        const target = document.getElementById(typeInput);
        var id = typeInput === 'service' ? this.state.countInputService : this.state.countInputDataProperty
        var field = document.createElement("div");
        field.className = "field";
        var control = document.createElement("div");
        control.className = "control";
        var input = document.createElement("input");
        input.type = "text";
        input.className = "input";
        input.placeholder = typeInput === 'service' ? "Servicio" : "Dato";
        input.id = typeInput === 'service' ? "service" + id : "dataProperty" + id;
        control.appendChild(input);
        field.appendChild(control);
        target.appendChild(field);
        id += 1;
        if (typeInput === 'service') this.setState({ countInputService: id }); else this.setState({ countInputDataProperty: id });
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
                            </div>
                            <div >
                                <div class="field">
                                    <label class="label">Servicios de la propiedad</label>
                                    <div class="control">
                                        <input class="input" type="text" id="service0" placeholder="Servicio" />
                                    </div>
                                </div>
                                <div id="service"></div>
                                <div class="field is-grouped is-grouped-right">
                                    <button class="button is-primary" onClick={this.addInput.bind(this, 'service')}>Añadir servicio</button>
                                </div>
                            </div>
                            <div>
                                <div class="field">
                                    <label class="label">Datos del interior</label>
                                    <div class="control">
                                        <input class="input" type="text" id="dataProperty1" placeholder="Dato" />
                                    </div>
                                </div>
                                <div id="dataProperty"></div>
                                <div class="field is-grouped is-grouped-right">
                                    <button class="button is-primary" onClick={this.addInput.bind(this, 'dataProperty')}>Añadir dato</button>
                                </div>
                            </div>
                            <div>
                                <div class="field">
                                    <label class="label">Condición</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Condición de la propiedad" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="field">
                                    <label class="label">Entrecalles en donde se encuentra la propiedad</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Entrecalles de la propiedad" />
                                    </div>
                                </div>
                                <h6 class="subtitle is-5"> </h6>
                                <div class="field">
                                    <label class="label">Referencias adicionales</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Referencias adicionales" />
                                    </div>
                                </div>
                            </div>
                            <div>
                            <div class="box has-text-centered">
                                <button class="button is-primary" onClick={this.addInput.bind(this, 'service')}>Anunciar propiedad</button>
                            </div>
                            </div>
                            
                        </Columns.Column>
                        <Columns.Column>
                            <div className="container has-text-centered">
                                <Heading subtitle>Dirección de la propiedad</Heading>
                            </div>
                            <Map
                                google={this.props.google}
                                center={{ lat: 19.432777, lng: -99.133217 }}
                                height="50vh"
                                zoom={15}
                            />
                            <hr></hr>
                            <div className="container has-text-centered">
                                <Heading subtitle>Imágenes de la Propiedad</Heading>
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
                            <div class="box has-text-centered">
                                <button class="button is-primary" onClick={this.addInput.bind(this, 'service')}>Guardar propiedad</button>
                            </div>
                        </Columns.Column>
                    </Columns>
                </Section>
            </div>
        )
    }
}

export default PublicarPropiedad;