import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class PokeByName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchVal: ''
        };

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(e) {
        this.setState({ searchVal: e.target.value });
    }

    render() {
        if (!this.state.searchVal) {
            return (
                <span>
                    <input onChange={this.handleInput} className='ui input' placeholder='Pokemon by Name' />
                </span>
            )
        }

        return (
            <span>
                <input onChange={this.handleInput} className='ui large input' placeholder='Pokemon by Exact Name' />
                <NavLink className='tiny ui fluid button primary' to={`/pokemon/${this.state.searchVal.toLowerCase()}`}>Go!</NavLink>
            </span>
        )


    }

}

export default PokeByName;
