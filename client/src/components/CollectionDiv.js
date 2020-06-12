import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { api } from '../utils';


const Collection = ({ list, ...rest }) => (
    <ul className="collList">
        {list.map((poke, i) => (
            <div className="ui circular segment" key={i}>
                <CollectionLink key={i} name={poke} />
            </div>
        ))}
    </ul>
)





class CollectionLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
        }

        this.redirect = this.redirect.bind(this);
    };

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            this.setState({
                name: this.props.name,
            })
        }
    }

    componentDidMount() {
        this.loadPokeNum();
    }

    redirect(e) {
        return (
            <Redirect to={`/pokemon/${this.state.name}`} />
        )
    }

    async loadPokeNum() {
        const res = await fetch(`${api}/pokemon/${this.state.name}`);

        if (res.ok) {
            const pokemon = await res.json();
            const { id } = pokemon;

            this.setState({ num: id });
        }
    }

    render() {

        if (!this.state.name) return null;

        return (
            <div className='collLink'>
                <NavLink to={`/pokemon/${this.state.name}`} >
                    <img className='collectionSprite' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.num}.png`} alt='Sprite' onClick={this.redirect} />
                </NavLink>
            </div>
        )
    }
}



export default Collection;
