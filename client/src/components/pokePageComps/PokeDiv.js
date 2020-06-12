import React, { Component } from 'react';
import { api } from '../../utils';
import PokeList from './PokeList';
// import PokeLink from './PokeLink';

class PokeDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,

        }
    }


    async componentDidMount() {
        const list = await this.getPokemon()

        // console.log(list);

        this.setState({
            listSegment: list.slice(this.state.offset, this.state.offset + 25)
        })

        // console.log(this.state.listSegment);
    };


    async getPokemon() {
        const res = await fetch(`${api}/pokemon?limit=897`);

        if (res.ok) {

            const list = await res.json()
            // console.log(list);
            const parseList = list.results
            // console.log(parseList);

            this.setState({
                list: parseList
            })
            return parseList;

        } else {
            console.error('Get Pokemon Failed!')
            return;
        };
    }

    handleNext = () => {
        let newOffset = this.state.offset + 25
        if (newOffset >= 897) newOffset = 0;


        let list = this.state.list

        this.setState({
            offset: newOffset,
            listSegment: list.slice(newOffset, newOffset + 25)
        })
    }

    handlePrevious = () => {
        let newOffset = this.state.offset - 25;
        if (newOffset < 0) newOffset = 876;

        let list = this.state.list

        this.setState({
            offset: newOffset,
            listSegment: list.slice(newOffset, newOffset + 25)
        })


    }


    render() {
        const list = this.state.listSegment

        if (!list) return null;

        return (
            <div>
                <nav className='3 fluid ui buttons'>
                    <button className='ui button green' onClick={this.handlePrevious}>Previous</button>
                    <button className='ui button primary' onClick={this.handleNext}>Next</button>
                </nav>
                <PokeList list={list} />
                <nav className='3 fluid ui buttons'>
                    <button className='ui button green' onClick={this.handlePrevious}>Previous</button>
                    <button className='ui button primary' onClick={this.handleNext}>Next</button>
                </nav>
            </div>
        )
    }

}

export default PokeDiv;
