import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Logo from 'resources/images/Logo.jpg'
import Swal from 'sweetalert2'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from 'axios';
import userData from 'UserProfile'
/*Librerias del memo :v*/ 
import { useHistory } from "react-router-dom";
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            nombre: '',
            apellido: '',
            numero: '',
            correo: '',
            contraseña: '',
            dataImagen: '',
            image: '',
            cropData: "#",
            cropper: '',
            correoIngreso: '',
            statusForm: [false, false, false, false, false, false] //Que estoy haciendo con mi vida unu?
            //Como sea, valores para validar, orden: Nombre,apellido, email, pass, cel, img
        };
        this.showModal = this.showModal.bind(this);
        this.showModalIngreso = this.showModalIngreso.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal_image = this.showModal_image.bind(this);
        this.closeModal_image = this.closeModal_image.bind(this);
        this.valName = this.valName.bind(this);
        this.valApellido = this.valApellido.bind(this);
        this.valNumber = this.valNumber.bind(this);
        this.valPasswordI = this.valPasswordI.bind(this);
        this.valPassword = this.valPassword.bind(this);
        this.valMail = this.valMail.bind(this);
        this.cAName = this.cAName.bind(this);
        this.getCropData = this.getCropData.bind(this);
        this.hacerRegistro = this.hacerRegistro.bind(this);
        this.valMailI = this.valMailI.bind(this);
        this.closeModal_IniciarSesion = this.closeModal_IniciarSesion.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.logout = this.logout.bind(this);
        this.cita = this.cita.bind(this);
    }

    cita  = () => {
        window.location.href = '/';
        //No se como mandar a otra pagina unu, auida
    }

    componentDidMount() {
        const nombreU = userData.getName()
        if (nombreU !== null && nombreU !== '') {
            document.getElementById("prueba").style.visibility = "visible"
            document.getElementById("iniciarSesion").style.visibility = "hidden"
            document.getElementById("opLeft").style.visibility = "hidden"
        } else {
            document.getElementById("prueba").style.visibility = "hidden"
        }

    }

    logout = () => {
        Swal.fire({
            title: 'Sesión cerrada',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(function (isConfirm) {
            if (isConfirm) {
                localStorage.clear();
                window.location.href = '/';
            }
        });
    }

    getCropData = () => {
        if (typeof this.state.cropper !== "undefined") {
            this.setState({ cropData: this.state.cropper.getCroppedCanvas().toDataURL() },
                () => {
                    document.getElementById('msgImage').innerHTML = '<img src=' + this.state.cropData + ' id=putita />';
                    this.closeModal_image()
                }
            );
        }
    };

    showModal = () => {
        var target = document.getElementById('modal');
        document.documentElement.classList.add("is-clipped");
        target.classList.add("is-active");
    }

    showModalIngreso = () => {
        var target = document.getElementById('modal_inicio_sesion');
        document.documentElement.classList.add("is-clipped");
        target.classList.add("is-active");
    }

    closeModal_IniciarSesion = () => {
        var target = document.getElementById('modal_inicio_sesion');
        target.classList.remove("is-active");
        document.documentElement.classList.remove("is-clipped");
    }

    closeModal = () => {
        var target = document.getElementById('modal');
        target.classList.remove("is-active");
        document.documentElement.classList.remove("is-clipped");
    }

    showModal_image = () => {
        var target = document.getElementById('modal_image');
        document.documentElement.classList.add("is-clipped");
        target.classList.add("is-active");
    }

    closeModal_image = () => {
        var target = document.getElementById('modal_image');
        target.classList.remove("is-active");
        document.documentElement.classList.remove("is-clipped");
    }

    valApellido = (e) => {
        const re = /^[a-zA-Z\s\u00C0-\u00FF]*$/;
        var sForm = this.state.statusForm
        if (e.target.value === '' || re.test(e.target.value)) {
            sForm[1] = true
            this.setState({ apellido: [e.target.value], statusForm: sForm })
        }
    }

    valName = (e) => {
        const re = /^[a-zA-Z\s\u00C0-\u00FF]*$/;
        var sForm = this.state.statusForm
        if (e.target.value === '' || re.test(e.target.value)) {
            sForm[0] = true
            this.setState({ nombre: [e.target.value], statusForm: sForm })
        }
    }

    valNumber = (e) => {
        const re = /^[0-9\b]+$/;
        var sForm = this.state.statusForm
        if (e.target.value === '' || re.test(e.target.value)) {
            sForm[4] = true
            this.setState({ numero: [e.target.value], statusForm: sForm })
        }
    }

    valMail = (e) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var showMessage = document.getElementById("msgMail")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        this.setState({ correo: [e.target.value] },
            () => {
                var sForm = this.state.statusForm
                if ((e.target.value === '' || re.test(e.target.value)) && this.state.correo[0].length !== 0) {
                    showMessage.innerHTML = "Correo valido."
                    showMessage.classList.add("is-success")
                    sForm[2] = true
                    this.setState({ statusForm: sForm })
                } else {
                    showMessage.innerHTML = "Correo no valido."
                    showMessage.classList.add("is-danger")
                    sForm[2] = false
                    this.setState({ statusForm: sForm })
                }
            }
        )
    }

    valPasswordI = (e) => {
        let pass_o = document.getElementById("passO").value
        const re8caracter = new RegExp("[a-zA-Z0-9]{8,}");
        const letraMin = new RegExp("(?=.*[a-z])");
        const letraMay = new RegExp("(?=.*[A-Z])");
        const unDig = new RegExp("(?=.*[0-9])");
        const carEspecial = new RegExp("(?=.*[!@#$%^&*:])");

        var showMessage = document.getElementById("msgPassO")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        var message = [' 8 caracteres', ' al menos una letra mayúscula',
            ' al menos una letra minúscula', ' un número', ' un símbolo (!, @, #, $, %, ^, &, *, :)']
        const auxmessage = [' 8 caracteres', ' al menos una letra mayúscula',
            ' al menos una letra minúscula', ' un número', ' un símbolo (!, @, #, $, %, ^, &, *, :)']
        this.setState({ contraseña: [e.target.value] }, () => {
            if (re8caracter.test(pass_o)) {
                message.splice(message.indexOf(auxmessage[0]), 1)
            }
            if (letraMay.test(pass_o)) {
                message.splice(message.indexOf(auxmessage[1]), 1)
            }
            if (letraMin.test(pass_o)) {
                message.splice(message.indexOf(auxmessage[2]), 1)
            }
            if (unDig.test(pass_o)) {
                message.splice(message.indexOf(auxmessage[3]), 1)
            }
            if (carEspecial.test(pass_o)) {
                message.splice(message.indexOf(auxmessage[4]), 1)

            }
            if (message.length === 0 && this.state.contraseña[0].length !== 0) {
                showMessage.innerHTML = "Contraseña con formato valido"
                showMessage.classList.add("is-success")
            } else {
                showMessage.innerHTML = "Debe de contener:" + message.join()
                showMessage.classList.add("is-danger")
            }

        })

    }

    valPassword = (e) => {
        let pass_o = document.getElementById("passO").value
        let pass_c = document.getElementById("passC").value
        var showMessage = document.getElementById("msgPassC")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        var sForm = this.state.statusForm
        if (pass_o === pass_c) {
            showMessage.innerHTML = "Las contraseñas coinciden."
            showMessage.classList.add("is-success")
            sForm[3] = true
            this.setState({ statusForm: sForm })
        } else {
            showMessage.innerHTML = "Las contraseñas no coinciden."
            showMessage.classList.add("is-danger")
            sForm[3] = false
            this.setState({ statusForm: sForm })
        }
    }

    cAName = (event) => {
        event.stopPropagation()
        event.preventDefault()
        var file = event.target.files[0]
        var showMessage = document.getElementById("msgImage")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        var sForm = this.state.statusForm
        if (file != undefined) {
            if (file.size / 1024 > 1024) {
                showMessage.innerHTML = "El archivo debe ser menor a 1 MB."
                showMessage.classList.add("is-danger")
                sForm[5] = false
                this.setState({ statusForm: sForm })
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    this.setState({ image: reader.result });
                };
                reader.readAsDataURL(file);
                sForm[5] = true
                this.setState({
                    dataImagen: file, statusForm: sForm
                },
                    this.showModal_image
                )

                showMessage.innerHTML = "Foto guardada."
                showMessage.classList.add("is-success")
            }
        } else {

        }
    }

    valMailI = (e) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var showMessage = document.getElementById("msgMailIngreso")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        this.setState({ correoIngreso: [e.target.value] },
            () => {
                var sForm = this.state.statusForm
                if ((e.target.value === '' || re.test(e.target.value)) && this.state.correoIngreso[0].length !== 0) {
                    showMessage.innerHTML = "Correo valido."
                    showMessage.classList.add("is-success")
                    sForm[2] = true
                    this.setState({ statusForm: sForm })
                } else {
                    showMessage.innerHTML = "Correo no valido."
                    showMessage.classList.add("is-danger")
                    sForm[2] = false
                    this.setState({ statusForm: sForm })
                }
            }
        )
    }

    hacerRegistro = () => {
        var arrForm = this.state.statusForm
        var boolArray = arrForm[0]
        for (var i = 1; i < arrForm.length - 1; i++)
            boolArray = boolArray && arrForm[i]
        if (boolArray) {
            if (this.state.nombre[0].length !== 0 && this.state.apellido[0].length !== 0 && this.state.numero[0].length !== 0 && this.state.correo[0].length !== 0 && this.state.contraseña[0].length !== 0) {
                var formData = new FormData();
                formData.append('nombreUsuario', this.state.nombre[0]);
                formData.append('apellidoUsuario', this.state.apellido[0]);
                formData.append('numeroTel', this.state.numero[0]);
                formData.append('emailUsuario', this.state.correo[0]);
                formData.append('passUsuario', this.state.contraseña[0]);
                var formWImage = arrForm[5]
                if (!formWImage) {
                    axios({
                        method: "post",
                        url: "http://127.0.0.1:5000/user/register",
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
                    this.state.cropper.getCroppedCanvas().toBlob(function (blob) {
                        formData.append('imgUsuario', blob);
                        axios({
                            method: "post",
                            url: "http://127.0.0.1:5000/user/register",
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
                    });
                }
            } else {
                Swal.fire({
                    title: 'Faltan campos que llenar',
                    text: 'Porfavor de terminar el formulario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
        } else {
            Swal.fire({
                title: 'Faltan campos que llenar',
                text: 'Porfavor de terminar el formulario',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    iniciarSesion = () => {
        const contraseña = document.getElementById("contraseñaIngreso").value
        if (this.state.correoIngreso[0].length !== 0 && contraseña.length !== 0) {
            var formData = new FormData();
            formData.append('correoUsuario', this.state.correoIngreso[0]);
            formData.append('contraseñaUsuario', contraseña);
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/user/login",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Inicio de sesión',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                window.location.reload();
                            }
                        });
                        userData.setName(response.data.nombre);
                        userData.setlast_name(response.data.apellido);
                        userData.setType(response.data.tipo)
                        userData.setImage(response.data.imagen)
                    }

                })
                .catch(function (response) {
                    if (response.status === 449) {
                        Swal.fire({
                            title: 'Ocurrio un error',
                            text: 'Contraseña o correo incorrecto',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                    } else
                        Swal.fire({
                            title: 'El inicio de sesión fallo',
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

    render() {
        return (
            <div>
                <nav className="navbar is-info" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a class="navbar-item" style={{
                            background: `url(${Logo}) no-repeat center center`,
                            backgroundSize: "cover",
                            width: 110, height: 55
                        }} href="/">
                        </a>
                        <a
                            onClick={() => {
                                this.setState({ isActive: !this.state.isActive });
                            }}
                            role="button"
                            className={`navbar-burger burger ${this.state.isActive ? "is-active" : ""}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div
                        id="navbarBasicExample"
                        className={`navbar-menu ${this.state.isActive ? "is-active" : ""}`}
                    >
                        <div class="navbar-end">
                            <div class="navbar-item field">
                                <p class="control has-icons-right">
                                    <input class="input" type="text" placeholder="¿Qué estas buscando?" />
                                    <span class="icon is-small is-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ddd" d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" /></svg>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="navbar-end">
                            <a class="navbar-item" id="opLeft" ata-target="#modal" onClick={this.showModal}>
                                Registrarse
                            </a>
                            <a class="navbar-item" id="iniciarSesion" data-target="#modal" onClick={this.showModalIngreso}>
                                Iniciar sesión
                            </a>
                            <div id="prueba" className="navbar-item has-dropdown is-hoverable">
                                <a class="navbar-item" style={{
                                    background: `url(data:image/png;base64,${userData.getImage()}) no-repeat center center`,
                                    backgroundSize: "cover",
                                    width: 74, height: 55
                                }}>
                                </a>
                                <a className="navbar-link">
                                    Hola {userData.getName()} !
                                </a>
                                <div className="navbar-dropdown">
                                    <a className="navbar-item" href="/property_insert">Publicar propiedad</a>
                                    <a className="navbar-item">Jobs</a>
                                    <a className="navbar-item" onClick={this.cita}>Crear Citas up</a>
                                    <a className="navbar-item" onClick={this.logout}>Cerrar sesión</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>

                <div id="modal" class="modal">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title has-text-centered">Crea una cuenta</p>
                            <button class="delete" aria-label="close" onClick={this.closeModal}></button>
                        </header>

                        <section class="modal-card-body ">
                            <div class="content is-centered">
                                <div class="field">
                                    <p class="control has-icons-left has-icons-right">
                                        <input class="input" type="text" placeholder="Tus nombres" value={this.state.nombre} onChange={this.valName} />
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-user"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="field">
                                    <p class="control has-icons-left has-icons-right">
                                        <input class="input" type="text" placeholder="Tus apellidos" value={this.state.apellido} onChange={this.valApellido} />
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-user"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="field">
                                    <p class="control has-icons-left has-icons-right">
                                        <input class="input" type="email" value={this.state.correo} placeholder="Tu correo electrónico" onChange={this.valMail} />
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-envelope"></i>
                                        </span>
                                    </p>
                                    <p id="msgMail" class="help"></p>
                                </div>
                                <div class="field">
                                    <p class="control has-icons-left">
                                        <input id="passO" class="input" type="password" value={this.state.contraseña} placeholder="Tu contraseña" onChange={this.valPasswordI} />
                                        <span class="icon is-medium is-left">
                                            <i class="fa fa-lock"></i>
                                        </span>
                                    </p>
                                    <p id="msgPassO" class="help"></p>
                                </div>
                                <div class="field">
                                    <p class="control has-icons-left">
                                        <input id="passC" class="input" type="password" placeholder="Repite tu contraseña" onChange={this.valPassword} />
                                        <span class="icon is-medium is-left">
                                            <i class="fa fa-lock"></i>
                                        </span>
                                    </p>
                                    <p id="msgPassC" class="help"></p>
                                </div>
                                <div class="field">
                                    <div class="field is-expanded">
                                        <div class="field has-addons">
                                            <p class="control">
                                                <a class="button is-static">
                                                    +52
                                                </a>
                                            </p>
                                            <p class="control has-icons-left is-expanded">
                                                <input class="input" type="text" maxLength="10" placeholder="Número teléfonico" value={this.state.numero} onChange={this.valNumber} />
                                                <span class="icon is-medium is-left">
                                                    <i class="fa fa-phone"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="file has-name">
                                    <label class="file-label">
                                        <input class="file-input" accept="image/*" id="file-upload" type="file" name="resume" onChange={this.cAName.bind(this)} />
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fa fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Imagen de perfil (opcional)
                                            </span>
                                        </span>
                                        <span for="file-upload" id="file-upload-filename" class="file-name">
                                            {this.state.dataImagen.name}
                                        </span>
                                        <br />
                                    </label>
                                </div>
                                <p id="msgImage" class="help"></p>
                                <div class="buttons is-centered">
                                    <button class="button is-success" onClick={this.hacerRegistro}>Crear tu cuenta</button>
                                </div>
                            </div>
                        </section>
                        <div class="box has-background-grey-lighter has-text-centered">
                            <p>¿Ya tienes una cuenta?</p><br />
                            <button class="button is-info">Inicia sesión</button>
                        </div>
                    </div>
                </div>

                <div id="modal_image" class="modal">
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
                                    src={this.state.image}
                                    viewMode={1}
                                    guides={true}
                                    minCropBoxHeight={10}
                                    minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    onInitialized={(instance) => {
                                        this.setState({ cropper: instance });
                                    }}
                                />
                                <div>
                                    <button class=" button is-link" style={{ float: "right" }} onClick={this.getCropData}>
                                        Salvar y cerrar
                                                </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div id="modal_inicio_sesion" class="modal">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title has-text-centered">Accede a tu cuenta</p>
                            <button class="delete" aria-label="close" onClick={this.closeModal_IniciarSesion}></button>
                        </header>

                        <section class="modal-card-body ">
                            <div class="content is-centered">
                                <div class="field">
                                    <p class="control has-icons-left has-icons-right">
                                        <input class="input" type="email" value={this.state.correoIngreso} placeholder="Tu correo electrónico" onChange={this.valMailI} />
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-envelope"></i>
                                        </span>
                                    </p>
                                    <p id="msgMailIngreso" class="help"></p>
                                </div>
                                <div class="field">
                                    <p class="control has-icons-left">
                                        <input id="contraseñaIngreso" class="input" type="password" placeholder="Tu contraseña" />
                                        <span class="icon is-medium is-left">
                                            <i class="fa fa-lock"></i>
                                        </span>
                                    </p>
                                    <p id="msgPassO" class="help"></p>
                                </div>
                                <div id="holaatodos"></div>
                                <div class="buttons is-centered">
                                    <button class="button is-success" onClick={this.iniciarSesion}>Iniciar sesión</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div >
        )
    }
}

export default Navbar