import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from 'components/Navbar';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import UserData from 'UserProfile';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
class Configuracion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            telefono: '',
            dataImagen_con: '',
            image_con: '',
            cropData_con: "#",
            cropper_con: '',
            hayimg: false
        };
        this.cAName_con = this.cAName_con.bind(this);
        this.showModal_image_con = this.showModal_image_con.bind(this);
        this.closeModal_image_con = this.closeModal_image_con.bind(this);
        this.getCropData_con = this.getCropData_con.bind(this);
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
            this.setState({ telefono: UserData.getMovil() })
        }
    }

    valNumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ telefono: [e.target.value] })
        }
    }

    getCropData_con = () => {
        if (typeof this.state.cropper_con !== "undefined") {
            this.setState({ cropData_con: this.state.cropper_con.getCroppedCanvas().toDataURL() },
                () => {
                    document.getElementById('msgImage_con').innerHTML = '<img src=' + this.state.cropData_con + ' id=imguser_con />';
                    this.closeModal_image_con()
                }
            );
        }
    };

    cAName_con = (event) => {
        event.stopPropagation()
        event.preventDefault()
        var file = event.target.files[0]
        var showMessage = document.getElementById("msgImage_con")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        if (file != undefined) {
            if (file.size / 1024 > 1024) {
                showMessage.innerHTML = "El archivo debe ser menor a 1 MB."
                showMessage.classList.add("is-danger")
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    this.setState({ image_con: reader.result });
                };
                reader.readAsDataURL(file);
                this.setState({
                    dataImagen_con: file,
                    hayimg: true
                },
                    this.showModal_image_con
                )
                showMessage.innerHTML = "Foto guardada."
                showMessage.classList.add("is-success")
            }
        }
    }
    showModal_image_con = () => {
        var target = document.getElementById('modal_image_con');
        document.documentElement.classList.add("is-clipped");
        target.classList.add("is-active");
    }

    closeModal_image_con = () => {
        var target = document.getElementById('modal_image_con');
        target.classList.remove("is-active");
        document.documentElement.classList.remove("is-clipped");
    }
    actualizarCuenta = () => {
        var formData = new FormData();
        formData.append('email', UserData.getEmail());
        formData.append('telefono', this.state.telefono);
        var validar = this.state.hayimg
        if (!validar) {
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/user/update",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    if (response.status === 201)
                        Swal.fire({
                            title: 'Registro realizado con exito',
                            text: 'Porfavor de revisar su correo para poder confirmar su cuenta',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                window.location.reload();
                            }
                        });
                })
                .catch(function (response) {
                    if (response["response"].status === 460)
                        Swal.fire({
                            title: 'El registro no se pudo completar',
                            text: 'El correo que se intento usar ya esta en uso, use un correo diferente',
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
            this.state.cropper_con.getCroppedCanvas().toBlob(function (blob) {
                formData.append('imgUsuario', blob);
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/user/update",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            UserData.setImage(response.data.imagen);
                            UserData.setMovil(response.data.movil);
                            Swal.fire({
                                title: 'Registro realizado con exito',
                                text: 'Porfavor de revisar su correo para poder confirmar su cuenta',
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
                        if (response["response"].status === 460)
                            Swal.fire({
                                title: 'El registro no se pudo completar',
                                text: 'El correo que se intento usar ya esta en uso, use un correo diferente',
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
            });
        }

    }

    eliminarCuenta = () => {
        var formData = new FormData();
        formData.append('email', UserData.getEmail());
        Swal.fire({
            title: '¿Esta seguro de eliminar su cuenta?',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/user/delete_account",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            Swal.fire({
                                title: 'Cuenta eliminada con éxito',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            }).then(function (isConfirm) {
                                if (isConfirm) {
                                    localStorage.clear();
                                    window.location.href = '/';
                                }
                            });
                        }

                    })
                    .catch(function (response) {
                        if (response.status === 460)
                            Swal.fire({
                                title: 'Ocurrio un error',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            })
                    });
            }
        });

    }

    render() {

        return (
            <div>
                <Navbar /><Section>
                    <div className="container has-text-centered">
                        <Heading title>Datos de la cuenta</Heading>
                    </div>
                    <br></br>
                    <div className="columns is-centered">
                        <div className="column field">
                            <label className="label has-text-centered">Nombre completo:</label>
                            <div className="control">
                                <input className="input" type="text" value={UserData.getName() + " " + UserData.getLastName()} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="columns is-centered">
                        <div className="column field">
                            <label className="label has-text-centered">Correo electronico</label>
                            <div className="control">
                                <input className="input" type="text" value={UserData.getEmail()} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="columns is-centered">
                        <div className="column field">
                            <label className="label has-text-centered">Cambiar imagen de perfil</label>
                            <div className="control">
                                <div class="file has-name">
                                    <label class="file-label">
                                        <input class="file-input" accept="image/*" id="file-upload" type="file" name="resume" onChange={this.cAName_con.bind(this)} />
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fa fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Imagen de perfil (opcional)
                                            </span>
                                        </span>
                                        <span for="file-upload" id="file-upload-filename" class="file-name">
                                            {this.state.dataImagen_con.name}
                                        </span>
                                        <br />
                                    </label>
                                </div>
                                <p id="msgImage_con" class="help"></p>
                            </div>
                        </div>
                    </div>
                    <div className="columns is-centered">
                        <div className="column field">
                            <label className="label has-text-centered">Numero teléfonico</label>
                            <div className="control">
                                <input className="input" maxLength="10" placeholder="Número teléfonico" value={this.state.telefono} onChange={this.valNumber} type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="columns is-centered">
                        <div class="column has-text-centered is-2">
                            <button class="button is-link" onClick={this.actualizarCuenta}>Actualizar información</button>
                        </div>
                    </div>
                    <div className="columns is-centered">
                        <div class="column has-text-centered is-2">
                            <button class="button is-danger" onClick={this.eliminarCuenta}>Eliminar cuenta</button>
                        </div>
                    </div>
                </Section>
                <div id="modal_image_con" class="modal">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title has-text-centered">Recortar imagen</p>
                        </header>

                        <section class="modal-card-body ">
                            <div class="content is-centered">
                                <Cropper
                                    style={{ width: "100%" }}
                                    initialAspectRatio={1}
                                    preview=".img-preview"
                                    src={this.state.image_con}
                                    viewMode={1}
                                    guides={true}
                                    minCropBoxHeight={10}
                                    minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    onInitialized={(instance) => {
                                        this.setState({ cropper_con: instance });
                                    }}
                                />
                                <div>
                                    <button class=" button is-link" style={{ float: "right" }} onClick={this.getCropData_con}>
                                        Salvar y cerrar
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        )
    }
}

export default Configuracion;