import React from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Casita from 'resources/images/Casitacuqui.png';
import background from 'resources/images/borrable.jpg';
const Home = () => {
    return (
        <div>
            <Navbar />
            <Section style={{backgroundImage: `url(${background})`}}>
                <div className="container has-text-centered">
                    <Heading>
                        Trobify
                    </Heading>
                    <Columns>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                    </Columns>
                    <Columns>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                    </Columns>
                    <Columns>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                    </Columns><Columns>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                        <Columns.Column>
                            <Image src={Casita} />
                        </Columns.Column>
                    </Columns>
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


