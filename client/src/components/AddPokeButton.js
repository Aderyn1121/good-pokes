import React, { Component } from 'react';
import { backendUrl } from '../utils';
import { connect } from 'react-redux';


class AddPokeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        if (this.state.name) {
            this.loadCollection();
        }
    }

    async loadCollection() {
        const res = await fetch(`${backendUrl}/user/${this.props.userId}/collection`)
        const collection = await res.json();

        this.setState({ collection })
    }


    //add/remove Logic

    async handleAdd(e) {
        e.preventDefault();
        const res = await fetch(`${backendUrl}/user/${this.props.userId}/collection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pokemon: this.state.name })
        })

        if (res.ok) {
            const collection = await res.json();
            this.setState({
                collection
            })
        }
    }



    async handleRemove(e) {
        e.preventDefault();
        const res = await fetch(`${backendUrl}/user/${this.props.userId}/collection/${this.state.name}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })



        if (res.ok) {
            const collection = await res.json();
            this.setState({
                collection
            })
        }
    }


    render() {

        if (!this.state.collection) return null;
        // console.log(this.state.collection)

        if (this.state.collection.includes(this.state.name)) {
            return (
                <div>
                    <button className='negative ui button' onClick={this.handleRemove}>Remove from Collection</button>
                </div>
            )
        }

        return (
            <div>
                <button className='positive ui button' onClick={this.handleAdd}>Add to Collection</button>
            </div>
        )

    }


}



const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        userId: state.authentication.userId
    };
};



export default connect(
    mapStateToProps,
    null
)(
    AddPokeButton
);
