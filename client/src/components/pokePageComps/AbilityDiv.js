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
            <p className='abilityDesc'>
                {this.state.entry}
            </p>
        )
    }
}


const AbilityDiv = ({ abilities, ...rest }) => {

    if (!abilities) return null;

    return (
        <div>
            {abilities.map((ability, i) => (
                <div key={i}>
                    <p>{ability.name}</p>
                    <AbilityDescription ability={ability} />
                </div>
            ))}
        </div>
    )
}

export default AbilityDiv;
