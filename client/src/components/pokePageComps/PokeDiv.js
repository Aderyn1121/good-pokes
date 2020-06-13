import React, { Component } from 'react';
import { api } from '../../utils';
import PokeList, { PokeListType } from './PokeList';
// import PokeLink from './PokeLink';

class PokeDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            type: null,
            byType: false
        }

        this.handleType = this.handleType.bind(this);
    }


    async componentDidMount() {

        let list = null;

        if (this.state.type) {
            list = await this.getPokemonByType();
        }
        else {
            list = await this.getPokemonDefault()
        }

        // console.log(this.state.list);

        this.setState({
            listSegment: list.slice(this.state.offset, this.state.offset + 25)
        })
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.type !== this.state.type) {
            this.getPokemonByType();
        }
    }

    async getPokemonByType() {
        const res = await fetch(`${api}/type/${this.state.type}`);

        if (res.ok) {

            const list = await res.json()
            const parseList = list.pokemon

            console.log(parseList);

            this.setState({
                list: parseList,
                listSegment: parseList.slice(this.state.offset, this.state.offset + 25),
                byType: true
            })
            return parseList;

        } else {
            console.error('Get Pokemon Failed!')
            return;
        };
    }



    async getPokemonDefault() {

        const res = await fetch(`${api}/pokemon?limit=897`);

        if (res.ok) {

            const list = await res.json()
            const parseList = list.results

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
        if (newOffset >= this.state.list.length) newOffset = 0;


        let list = this.state.list

        this.setState({
            offset: newOffset,
            listSegment: list.slice(newOffset, newOffset + 25)
        })
    }

    handlePrevious = () => {
        let newOffset = this.state.offset - 25;
        if (newOffset < 0) newOffset = 0;

        let list = this.state.list

        this.setState({
            offset: newOffset,
            listSegment: list.slice(newOffset, newOffset + 25)
        })


    }

    handleType(type) {
        this.setState({ type })
    }


    render() {
        if (!this.state.listSegment) return null;

        if (!this.state.byType) {
            return (
                <div>
                    <nav className='18 fluid ui buttons'>
                        <button className='ui button green' id='bug' onClick={() => { this.handleType('bug') }}>BUG</button>
                        <button className='ui button purple' id='dark' onClick={() => { this.handleType('dark') }}>DARK</button>
                        <button className='ui button yellow' id='electric' onClick={() => { this.handleType('electric') }} >ELECTRIC</button>
                        <button className='ui button purple' id='dragon' onClick={() => { this.handleType('dragon') }}>DRAGON</button>
                        <button className='ui button pink' id='fairy' onClick={() => { this.handleType('fairy') }}>FAIRY</button>
                        <button className='ui button orange' id='fighting' onClick={() => { this.handleType('fighting') }}>FIGHTING</button>
                        <button className='ui button red' id='fire' onClick={() => { this.handleType('fire') }}>FIRE</button>
                        <button className='ui button teal' id='flying' onClick={() => { this.handleType('flying') }}>FLYING</button>
                        <button className='ui button' id='normal' onClick={() => { this.handleType('normal') }}>NORMAL</button>
                        <button className='ui button purple' id='poison' onClick={() => { this.handleType('poison') }}>POISON</button>
                        <button className='ui button pink' id='psychic' onClick={() => { this.handleType('psychic') }}>PSYCHIC</button>
                        <button className='ui button purple' id='ghost' onClick={() => { this.handleType('ghost') }}>GHOST</button>
                        <button className='ui button green' id='grass' onClick={() => { this.handleType('grass') }}>GRASS</button>
                        <button className='ui button orange' id='rock' onClick={() => { this.handleType('rock') }}>ROCK</button>
                        <button className='ui button black' id='steel' onClick={() => { this.handleType('steel') }}>STEEL</button>
                        <button className='ui button orange' id='ground' onClick={() => { this.handleType('ground') }}>GROUND</button>
                        <button className='ui button teal' id='ice' onClick={() => { this.handleType('ice') }}>ICE</button>
                        <button className='ui button blue' id='water' onClick={() => { this.handleType('water') }}>WATER</button>
                    </nav>

                    <nav className='3 fluid ui buttons'>
                        <button className='ui button green' onClick={this.handlePrevious}>Previous</button>
                        <button className='ui button primary' onClick={this.handleNext}>Next</button>
                    </nav>
                    <PokeList list={this.state.listSegment} />
                    <nav className='3 fluid ui buttons'>
                        <button className='ui button green' onClick={this.handlePrevious}>Previous</button>
                        <button className='ui button primary' onClick={this.handleNext}>Next</button>
                    </nav>
                </div>
            )
        }


        else return (
            <div>
                <nav className='18 fluid ui buttons'>
                    <button className='ui button green' id='bug' onClick={() => { this.handleType('bug') }}>BUG</button>
                    <button className='ui button purple' id='dark' onClick={() => { this.handleType('dark') }}>DARK</button>
                    <button className='ui button yellow' id='electric' onClick={() => { this.handleType('electric') }} >ELECTRIC</button>
                    <button className='ui button purple' id='dragon' onClick={() => { this.handleType('dragon') }}>DRAGON</button>
                    <button className='ui button pink' id='fairy' onClick={() => { this.handleType('fairy') }}>FAIRY</button>
                    <button className='ui button orange' id='fighting' onClick={() => { this.handleType('fighting') }}>FIGHTING</button>
                    <button className='ui button red' id='fire' onClick={() => { this.handleType('fire') }}>FIRE</button>
                    <button className='ui button teal' id='flying' onClick={() => { this.handleType('flying') }}>FLYING</button>
                    <button className='ui button' id='normal' onClick={() => { this.handleType('normal') }}>NORMAL</button>
                    <button className='ui button purple' id='poison' onClick={() => { this.handleType('poison') }}>POISON</button>
                    <button className='ui button pink' id='psychic' onClick={() => { this.handleType('psychic') }}>PSYCHIC</button>
                    <button className='ui button purple' id='ghost' onClick={() => { this.handleType('ghost') }}>GHOST</button>
                    <button className='ui button green' id='grass' onClick={() => { this.handleType('grass') }}>GRASS</button>
                    <button className='ui button orange' id='rock' onClick={() => { this.handleType('rock') }}>ROCK</button>
                    <button className='ui button black' id='steel' onClick={() => { this.handleType('steel') }}>STEEL</button>
                    <button className='ui button orange' id='ground' onClick={() => { this.handleType('ground') }}>GROUND</button>
                    <button className='ui button teal' id='ice' onClick={() => { this.handleType('ice') }}>ICE</button>
                    <button className='ui button blue' id='water' onClick={() => { this.handleType('water') }}>WATER</button>
                </nav>
                <nav className='3 fluid ui buttons'>
                    <button className='ui button green' onClick={this.handlePrevious}>Previous</button>
                    <button className='ui button primary' onClick={this.handleNext}>Next</button>
                </nav>
                <PokeListType list={this.state.listSegment} />
                <nav className='3 fluid ui buttons'>
                    <button className='ui button green' onClick={this.handlePrevious}>Previous</button>
                    <button className='ui button primary' onClick={this.handleNext}>Next</button>
                </nav>
            </div >
        )
    }
}

export default PokeDiv;
