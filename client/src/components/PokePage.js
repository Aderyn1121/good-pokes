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

        const divHp = `${(parseInt(this.state.hp, 10) / 255) * 100}%`;
        const divAttack = `${(parseInt(this.state.attack, 10) / 255) * 100}%`;
        const divDefense = `${(parseInt(this.state.defense, 10) / 255) * 100}%`;
        const divSpatk = `${(parseInt(this.state.spatk, 10) / 255) * 100}%`;
        const divSpdef = `${(parseInt(this.state.spdef, 10) / 255) * 100}%`;
        const divSpeed = `${(parseInt(this.state.speed, 10) / 255) * 100}%`;

        if (!this.state.id) return null;

        return (
            <main>
                <PokeNavBar name={this.state.name} />
                <span className='ui segment pokeTitleSpan' style={{ backgroundImage: 'linear-gradient(#7D1827 5%, rgb(189, 59, 59) 40%, black 5%, white 49%, #CADBD1)', fontSize: '20px', textTransform: 'bold' }} >
                    <div className='spriteName'>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.id}.png`} alt='Sprite' />
                        <h1>{this.state.name} - #{this.state.id}</h1>
                    </div>
                    <div className='typeDiv'>
                        {this.state.types.map((type, i) => (
                            <img className='typeSprite' key={i} src={require(`../../type-images/${type}.png`)} alt={`${type}`} />
                        ))}
                    </div>


                </span>
                <div className="ui section divider"></div>
                <div className='ui segment inverted' style={{ fontSize: '20px', textAlign: 'center' }}>
                    <h2 className='ui header'>Statistics:</h2>
                    <span style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '25%' }}>
                        <div className='hp'>HP: {this.state.hp}</div>
                        <div className='hpBar' style={{ width: '255px', height: '20px', border: 'red 1px solid', marginRight: '35%' }}>
                            <div style={{ backgroundColor: 'red', width: divHp, height: '20px' }}></div>
                        </div>
                    </span>

                    <span style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '25%', paddingTop: '15px' }}>
                        <div className='atk'>Attack: {this.state.attack}</div> <div className='atkBar' style={{ width: '255px', height: '20px', border: 'orange 1px solid', marginRight: '35%' }}>
                            <div style={{ backgroundColor: 'orange', width: divAttack, height: '20px' }}></div>
                        </div>
                    </span>

                    <span style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '25%', paddingTop: '15px' }}>
                        <div className='def'>Defense: {this.state.defense}</div>
                        <div className='defBar' style={{ width: '255px', height: '20px', border: 'yellow 1px solid', marginRight: '35%' }}>
                            <div style={{ backgroundColor: 'yellow', width: divDefense, height: '20px' }}></div>
                        </div>
                    </span>

                    <span style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '25%', paddingTop: '15px' }}>
                        <div className='spatk'>Sp. Attack: {this.state.spatk}</div>
                        <div className='spatkBar' style={{ width: '255px', height: '20px', border: 'blue 1px solid', marginRight: '35%', }}>
                            <div style={{ backgroundColor: 'blue', width: divSpatk, height: '20px' }}></div>
                        </div>
                    </span>

                    <span style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '25%', paddingTop: '15px' }}>
                        <div className='spdef'>Sp. Defense: {this.state.spdef}</div>
                        <div className='spdefBar' style={{ width: '255px', height: '20px', border: 'green 1px solid', marginRight: '35%' }}>
                            <div style={{ backgroundColor: 'green', width: divSpdef, height: '20px' }}></div>
                        </div>
                    </span>

                    <span style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '25%', paddingTop: '15px' }}>
                        <div className='speed'>Speed: {this.state.speed}</div>
                        <div className='speedBar' style={{ width: '255px', height: '20px', border: 'purple 1px solid', marginRight: '35%' }}>
                            <div style={{ backgroundColor: 'purple', width: divSpeed, height: '20px' }}></div>
                        </div>
                    </span>
                </div>

                <div className='ui tertiary inverted blue segment'>
                    <h2 className='ui header'>Abilities</h2>
                    <AbilityDiv abilities={this.state.abilities} />
                </div>

                <div className='ui tertiary inverted red segment'>
                    <h2 className='ui header'>Moves</h2>
                    <MoveDiv moves={this.state.moves} />
                </div>

                <div className='ui tertiary inverted green segment'>
                    <h2 className='ui header'>Comments</h2>
                    <CommentsDiv id={this.state.id} />
                </div>
            </main>
        )
    }
    //todo add comments
}

export default PokePage;
