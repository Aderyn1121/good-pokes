import React, { Component } from 'react';
import { api } from '../../utils';

class AbilityDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ability: this.props.ability
        }
    }

    componentDidMount() {
        this.getDesc();
    }


    getEng(abilityObj) {
        const effectEntries = abilityObj.effect_entries;

        let tempEntry = '';

        effectEntries.forEach(entry => {
            if (entry.language.name === "en") tempEntry = entry.effect;
        });

        return tempEntry;
    }


    async getDesc() {
        const res = await fetch(`${api}/ability/${this.state.ability.name}`)

        if (res.ok) {
            const desc = await res.json();
            const entry = this.getEng(desc)

            this.setState({
                entry: entry,
            })
        }
    }

    render() {
        if (!this.state.entry) return null;

        return (
            <p className='content' style={{ fontSize: '20px', marginTop: '8px', marginLeft: '15px', borderBottom: 'black 1px solid', paddingBottom: '10px' }}>
                {this.state.entry}
            </p>
        )
    }
}


const AbilityDiv = ({ abilities, ...rest }) => {

    if (!abilities) return null;

    return (
        <div className='ui divided list'>
            {abilities.map((ability, i) => (
                <div className='item' key={i}>
                    <p className='header' style={{ textTransform: 'capitalize', fontSize: '22px' }}>{ability.name}</p>
                    <AbilityDescription ability={ability} />
                </div>
            ))}
        </div>
    )
}

export default AbilityDiv;
