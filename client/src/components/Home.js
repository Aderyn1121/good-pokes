import React from 'react';
import PokeDiv from './pokePageComps/PokeDiv';
import NavBar from './NavBar';



const Home = (...props) => (
    <main>
        <NavBar props={props} />
        <PokeDiv />
    </main>
)

export default Home;
