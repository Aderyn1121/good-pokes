import { PokeNavBar } from './NavBar';
import React, { Component } from 'react';
import { api } from '../utils';
import MoveDiv from './pokePageComps/MoveDiv';
import AbilityDiv from './pokePageComps/AbilityDiv';
import CommentsDiv from './CommentsDiv';

class PokePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.pokemonName
        }
    };


    async loadPokeDeets() {
        const res = await fetch(`${api}/pokemon/${this.state.name}`);

        if (res.ok) {
            const pokemon = await res.json();

            const {
                id,
                abilities,
                moves,
                stats,
                types,
                weight
            } = pokemon;

            const typeNames = types.map((type, i) => {
                return type.type.name;
            })

            // console.log(typeNames);

            const abilityList = abilities.map((ability) => {
                return ability.ability;
            })

            const hp = stats[0].base_stat;
            const attack = stats[1].base_stat;
            const defense = stats[2].base_stat;
            const spatk = stats[3].base_stat;
            const spdef = stats[4].base_stat;
            const speed = stats[5].base_stat;

            this.setState({
                id: id,
                abilities: abilityList,
                types: typeNames,
                weight: weight,
                moves: moves,
                hp,
                attack,
                defense,
                spatk,
                spdef,
                speed,
            })

            // console.log(this.state)

        }
    }

    componentDidMount() {
        this.loadPokeDeets();
    }


    render() {

        if (!this.state.id) return null;

        return (
            <main>
                <PokeNavBar name={this.state.name} />
                <span className='ui segment pokeTitleSpan' >
                    <div className='spriteName'>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.id}.png`} alt='Sprite' />
                        <h1 className='pokeName'>{this.state.name} - #{this.state.id}</h1>
                    </div>
                    <div className='typeDiv'>
                        {this.state.types.map((type, i) => (
                            <img className='typeSprite' key={i} src={require(`../../type-images/${type}.png`)} alt={`${type}`} />
                        ))}
                    </div>


                </span>
                <div className="ui section divider"></div>
                <div className='ui segment'>
                    <h2 className='ui header'>Statistics:</h2>
                    <p>Weight: {this.state.weight}</p>
                    <p>HP: {this.state.hp}</p>
                    <p>Attack: {this.state.attack}</p>
                    <p>Defense: {this.state.defense}</p>
                    <p>Sp. Attack: {this.state.spatk}</p>
                    <p>Sp. Defense: {this.state.spdef}</p>
                    <p>Speed: {this.state.speed}</p>
                </div>

                <h2 className='ui header'>Abilities</h2>
                <AbilityDiv abilities={this.state.abilities} />

                <h2 className='ui header'>Moves</h2>
                <MoveDiv moves={this.state.moves} />

                <h2 className='ui header'>Comments</h2>
                <CommentsDiv id={this.state.id} />
            </main>
        )
    }
    //todo add comments
}

export default PokePage;
