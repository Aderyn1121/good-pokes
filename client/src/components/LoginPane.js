import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../store/authentication';
import ErrorDiv from './ErrorDiv';

class LoginPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'test@test.com',
            password: 'test',
            errors: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);

    }

    updateEmail = e => {
        this.setState({ email: e.target.value });
    }

    updatePassword = e => {
        this.setState({ password: e.target.value });
    }

    render() {
        if (this.props.token) {
            return <Redirect to='/' />
        }

        return (
            <main className='formPage'>
                <h1 className='ui header'>Welcome to GoodPokes!</h1>
                <h3>
                    Please log in.
                </h3>

                <ErrorDiv errors={this.state.errors} />

                <div className='ui segment'>
                    <form onSubmit={this.handleSubmit}>
                        <p><label>Email Address
                        <input className="ui input" type="text"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.updateEmail} />
                        </label></p>

                        <p><label>Password
                            <input className="ui input" type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.updatePassword} />
                        </label></p>
                        <button className='ui mini green button' type='submit'>Login</button>
                        <NavLink className='ui mini button primary' to={`/sign-up`}>Sign up!</NavLink>
                    </form>
                </div>
            </main>

        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    LoginPane
);
