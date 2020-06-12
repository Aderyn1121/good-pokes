import React, { Component } from 'react';


const MoveList = ({ moves, ...rest }) => (
    <ul className='moveList'>
        {moves.map((move, i) => (
            <div className='move' key={i}>
                {move.move.name}
            </div>
        ))}
    </ul>
)


class MoveDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            moves: this.props.moves,
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.moves !== this.props.moves || prevState.offset !== this.state.offset) {
            this.setState({
                movePage: this.props.moves.slice(this.state.offset, this.state.offset + 11)
            })
        }
    }

    componentDidMount() {
        this.setState({
            movePage: this.props.moves.slice(this.state.offset, this.state.offset + 11)
        })
    }

    handleNext = () => {
        let newOffset = this.state.offset + 11
        if (newOffset >= this.state.moves.length) {
            newOffset = 0;
        }

        this.setState({
            offset: newOffset
        });
    }

    handlePrevious = () => {
        let newOffset = this.state.offset - 11
        if (newOffset < 0) newOffset = this.state.moves.length - 11;

        this.setState({
            offset: newOffset
        });
    }

    render() {

        if (!this.state.movePage) return null;

        return (
            <div className='moveDiv'>
                <MoveList moves={this.state.movePage} />
                <div className='moveButtons'>
                    <button className='mini ui button' onClick={this.handlePrevious}>Previous 10</button>
                    <button className='mini ui button' onClick={this.handleNext}>Next 10</button>
                </div>
            </div>
        )

    }

}

export default MoveDiv;
