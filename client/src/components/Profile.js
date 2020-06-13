import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavBar from "./NavBar";
import { backendUrl } from '../utils';
import Collection from "./CollectionDiv";


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    };

    async loadProfileDetails() {
        const res = await fetch(`${backendUrl}/user/${this.props.userId}`);

        if (res.ok) {
            const user = await res.json();

            const {
                username,
                pronouns,
                collection,
                birthday,
                friends,
                groups
            } = user

            this.setState({
                username,
                pronouns,
                collection,
                birthday,
                friends,
                groups
            })
        }
    }

    componentDidMount() {
        this.loadProfileDetails();
    }


    render() {
        if (!this.props.token) {
            return <Redirect to='/' />
        }

        if (!this.state.username) return null;

        return (
            <main>
                <NavBar />
                <div className='ui segment'>
                    <h1 className="ui center aligned header" style={{ fontSize: '35px' }}>{this.state.username}</h1>
                    <h3 className="ui center aligned header" style={{ fontSize: '30px' }}>
                        Birthday: {this.state.birthday}
                    </h3>
                    <h3 className="ui center aligned header" style={{ fontSize: '30px' }}>Pronouns: {this.state.pronouns}</h3>
                </div>
                <br></br>
                <div style={{ maxHeight: '1080px' }}>
                    <h2 className="ui center aligned header">Collection</h2>
                    <Collection list={this.state.collection} />
                </div>
            </main>
        )
    }


}





const mapStateToProps = state => ({
    token: state.authentication.token,
    userId: state.authentication.userId
});

const mapDispatchToProps = dispatch => {
    return {};
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)
