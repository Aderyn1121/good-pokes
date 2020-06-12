import React from 'react';
import PokeLink from './PokeLink';


const PokeList = ({ list, ...rest }) => (
    <ul className="pokeList">
        {list.map((poke, i) => (
            <div className="ui circular segment" key={i}>
                <PokeLink key={i} name={poke.name} url={poke.url} />
            </div>
        ))}
    </ul>
)

export default PokeList;
