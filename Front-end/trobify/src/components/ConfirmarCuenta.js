import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Button from 'react-bulma-components/lib/components/button'
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Casita from 'resources/images/Casitacuqui.png';

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
        const valStyle = document.getElementById("opLeft").style.visibility;
        if (valStyle == "hidden") {
            document.getElementById("ncorreoC").style.display = "none"
            document.getElementById("correoC").style.display = "block"
        } else {
            document.getElementById("correoC").style.display = "none"
            document.getElementById("ncorreoC").style.display = "block"
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


