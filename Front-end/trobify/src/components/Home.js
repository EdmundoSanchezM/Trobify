import React from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Casita from 'resources/images/Casitacuqui.png';
import c1 from 'resources/images/Fotos_inicio/1.jpg';
import c2 from 'resources/images/Fotos_inicio/2.jpg';
import c3 from 'resources/images/Fotos_inicio/3.jpg';
import c4 from 'resources/images/Fotos_inicio/4.jpg';
import c5 from 'resources/images/Fotos_inicio/5.jpg';
import c6 from 'resources/images/Fotos_inicio/6.jpg';
import c7 from 'resources/images/Fotos_inicio/7.jpg';
import c8 from 'resources/images/Fotos_inicio/8.jpg';
import c9 from 'resources/images/Fotos_inicio/9.jpg';
import c10 from 'resources/images/Fotos_inicio/10.jpg';
import c11 from 'resources/images/Fotos_inicio/11.jpg';
import c12 from 'resources/images/Fotos_inicio/12.jpg';
import c13 from 'resources/images/Fotos_inicio/13.jpg';
import c14 from 'resources/images/Fotos_inicio/14.jpg';
import c15 from 'resources/images/Fotos_inicio/15.jpg';
import c16 from 'resources/images/Fotos_inicio/16.jpg';

import background from 'resources/images/borrable.jpg';


//const images = importAll(require.context('resources/images', false, '/\.png/'));

const casas1=[
    c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16
]
const forxd=[0,1,2,3]
const forxd2=[0,1,2,3]
const Home = () => {
    var aux=3;
    var aux2=0;
    var cont=-1;
    return (
        <div>
            <Navbar />
            <Section>
                <div className="container has-text-centered">
                    <Heading>
                        Trobify memo uwu
                    </Heading>
                    {
                        forxd.map((forxd)=>{
                            return(
                                <Columns>
                                {forxd2.map((forxd2)=>{
                                    aux=aux+1;
                                    aux2=aux2+1;
                                    cont=cont+1;
                                    if(aux%4==0){
                                    return(
                                        <Columns.Column>
                                            <Image width="216px" height="198px" src={casas1[cont]} />
                                            Descripcion
                                        </Columns.Column>)
                                    }else if(aux2%4==0){
                                    return(
                                        <Columns.Column>
                                            <Image width="216px" height="198px" src={casas1[cont]} />
                                            Descripcion
                                        </Columns.Column>)
                                    }
                                    return(
                                        <Columns.Column>
                                            <Image width="216px" height="198px" src={casas1[cont]} />
                                            Descripcion
                                        </Columns.Column>
                                    )
                                    aux=aux+1
                                })}
                        </Columns>)
                        })
                    }   
                </div>
            </Section>
        </div>
    );
}
/*
 <Link to="/registromercancia">
                    <Button renderAs="button" color="success">
                        Comenzar
                    </Button>
                </Link>
*/
export default Home;


