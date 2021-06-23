import React from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Heading from 'react-bulma-components/lib/components/heading';
import Navbar from 'components/Navbar';
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
import c15 from 'resources/images/Fotos_inicio/15.jpg';
import c16 from 'resources/images/Fotos_inicio/16.jpg';
import BackgroundSlider from 'react-background-slider'

const Home = () => {
    return (
        <div>
            <Navbar />
            <BackgroundSlider
                images={[c1,  c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c15, c16]}
                duration={5}
                transition={2}
            />
            <Section>
                <h1 class="title is-1 has-text-white" style={{
                    height: "68vh",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '100px'
                }}>Trobify</h1>
            </Section>
        </div>
    );
}

export default Home;

