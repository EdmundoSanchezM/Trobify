import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logo from 'resources/images/Logo.jpg'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            nombre: '',
            apellido: '',
            numero: '',
            correo: '',
        };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.valName = this.valName.bind(this);
        this.valApellido = this.valApellido.bind(this);
        this.valNumber = this.valNumber.bind(this);
        this.valPasswordI = this.valPasswordI.bind(this);
        this.valPassword = this.valPassword.bind(this);
        this.valMail = this.valMail.bind(this);
    }
    componentDidMount() {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('confirmAcct')
        console.log(token)//Pensemeos que hacemos un llamado a la API y confirmamos confirmamos
        //Por el momento si token = 1 entonces => Confirmado otherwise no confirmado
        if (token == 1) {
            document.getElementById("opLeft").style.visibility = "hidden";//
        }
    }
    showModal = () => {
        var target = document.getElementById('modal');
        document.documentElement.classList.add("is-clipped");
        target.classList.add("is-active");
    }

    closeModal = () => {
        var target = document.getElementById('modal');
        target.classList.remove("is-active");
        document.documentElement.classList.remove("is-clipped");
    }

    valApellido = (e) =>{
        const re = /^[a-zA-Z\s\u00C0-\u00FF]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ apellido: [e.target.value] })
        }
    }

    valName = (e) => {
        const re = /^[a-zA-Z\s\u00C0-\u00FF]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ nombre: [e.target.value] })
        }
    }

    valNumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ numero: [e.target.value] })
        }
    }

    valMail = (e) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var showMessage = document.getElementById("msgMail")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        this.setState({ correo: [e.target.value] },
            () => {
                if ((e.target.value === '' || re.test(e.target.value)) && this.state.correo[0].length !== 0) {
                    showMessage.innerHTML = "Correo valido."
                    showMessage.classList.add("is-success")
                } else {
                    showMessage.innerHTML = "Correo no valido."
                    showMessage.classList.add("is-danger")
                }
            }
        )
    }

    valPasswordI = (e) => {
        let pass_o = document.getElementById("passO").value
        const re8caracter = new RegExp("[a-zA-Z0-9]{8,}");
        const letraMin = new RegExp("(?=.*[a-z])");
        const letraMay= new RegExp("(?=.*[A-Z])");
        const unDig = new RegExp("(?=.*[0-9])");
        const carEspecial = new RegExp("(?=.*[!@#$%^&*:])");

        var showMessage = document.getElementById("msgPassO")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        var message = [' 8 caracteres', ' al menos una letra mayúscula',
            ' al menos una letra minúscula', ' un número', ' un símbolo (!, @, #, $, %, ^, &, *, :)']
        const auxmessage = [' 8 caracteres', ' al menos una letra mayúscula',
        ' al menos una letra minúscula', ' un número', ' un símbolo (!, @, #, $, %, ^, &, *, :)']
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
        if (message.length === 0) {
            showMessage.innerHTML = "Contraseña con formato valido"
            showMessage.classList.add("is-success")
        } else {
            showMessage.innerHTML = "Debe de contener:" + message.join()
            showMessage.classList.add("is-danger")
        }
    }
    valPassword = (e) => {
        let pass_o = document.getElementById("passO").value
        let pass_c = document.getElementById("passC").value
        var showMessage = document.getElementById("msgPassC")
        showMessage.classList.remove("is-success")
        showMessage.classList.remove("is-danger")
        if (pass_o === pass_c) {
            showMessage.innerHTML = "Las contraseñas coinciden."
            showMessage.classList.add("is-success")
        } else {
            showMessage.innerHTML = "Las contraseñas no coinciden."
            showMessage.classList.add("is-danger")
        }
    }
    render() {
        return (
            <div>
                <nav className="navbar is-info" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a class="navbar-item" href="/">
                            <img src={Logo} style={{ width: 74, height: 50 }} href="/" />
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
                        <div id="opLeft" class="navbar-end">
                            <Link to="/" class="navbar-item is-active">
                                Inicio
                            </Link>
                            <a class="navbar-item" data-target="#modal" onClick={this.showModal}>
                                Registrarse
                            </a>
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
                                        <input id="passO" class="input" type="password" placeholder="Tu contraseña" onChange={this.valPasswordI} />
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
                                    <p class="control has-icons-left">
                                        <input class="input" type="text" maxLength="10" placeholder="Número teléfonico" value={this.state.numero} onChange={this.valNumber} />
                                        <span class="icon is-medium is-left">
                                            <i class="fa fa-phone"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="buttons is-centered">
                                    <button class="button is-success">Crear tu cuenta</button>
                                </div>
                            </div>
                        </section>
                        <div class="box has-background-grey-lighter has-text-centered">
                            <p>¿Ya tienes una cuenta?</p><br />
                            <button class="button is-info">Inicia sesión</button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Navbar