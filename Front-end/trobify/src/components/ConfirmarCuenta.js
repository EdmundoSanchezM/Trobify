import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Button from 'react-bulma-components/lib/components/button'
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Casita from 'resources/images/Casitacuqui.png';
import axios from 'axios';
import Swal from 'sweetalert2'

class ConfirmarCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            nombre: '',
            numero: '',
            correo: ''
        };
    }
    componentDidMount() {
        const urlWindow = window.location
        const query = new URLSearchParams(urlWindow.search);
        let ocultar = 0
        //Vemos si es confirmacion
        if (urlWindow.pathname.includes("confirmacion")) {
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

    }

    render() {
        return (
            <div>
                <Navbar />
                <Section>
                    <div id="correoC" className="container has-text-centered">
                        <Heading>
                            Su correo se ha confirmado con éxito
                        </Heading>
                        <Columns.Column size="half" offset="one-quarter">
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column size="half" offset="one-quarter">
                            <Button renderAs="button" color="success">
                                Iniciar sesión
                            </Button>
                        </Columns.Column>
                        <Columns.Column size="half" offset="one-quarter">
                            <Link to="/">
                                <Button renderAs="button" color="info">
                                    Ir a la pagina principal
                                </Button>
                            </Link>
                        </Columns.Column>
                    </div>
                    <div id="ncorreoC" className="container has-text-centered">
                        <Heading>
                            Su correo no ha podido ser confirmado con éxito
                        </Heading>
                        <Columns.Column size="half" offset="one-quarter">
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column size="half" offset="one-quarter">
                            <Link to="/">
                                <Button renderAs="button" color="info">
                                    Ir a la pagina principal
                                </Button>
                            </Link>
                        </Columns.Column>
                    </div>
                </Section>
            </div>
        )
    }
}
/*
 
*/
export default ConfirmarCuenta;


