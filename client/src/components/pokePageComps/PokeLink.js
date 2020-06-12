import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



class PokeLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            num: parseInt(this.props.url.slice(34), 10)
        }
    };

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            this.setState({
                name: this.props.name,
                num: parseInt(this.props.url.slice(34), 10)
            })
        }

    }

    render() {
        return (
            <div className='pokeLink'>
                <NavLink to={`/pokemon/${this.state.name}`} >
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.num}.png`} alt='Sprite' />
                </NavLink>
                <NavLink to={`/pokemon/${this.state.name}`} >{this.state.name}</NavLink>
            </div>
        )
    }
}

export default PokeLink;
