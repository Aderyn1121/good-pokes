import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../store/authentication';


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.confirmPassword,
            this.state.userName,
            this.state.birthday,
            this.state.pronouns,
            this.state.starter)
    }

    updateEmail = e => {
        this.setState({ email: e.target.value });
    }

    updatePassword = e => {
        this.setState({ password: e.target.value });
    }

    updateConfirmPassword = e => {
        this.setState({ confirmPassword: e.target.value });
    }

    updateUsername = e => {
        this.setState({ userName: e.target.value });
    }

    updateBirthday = e => {
        this.setState({ birthday: e.target.value });
    }

    updatePronouns = e => {
        this.setState({ pronouns: e.target.value });
    }

    updateStarter = e => {
        this.setState({ starter: e.target.value });
    }




    render() {
        if (this.props.token) {
            return <Redirect to='/' />
        }

        return (
            <main className='formPage'>
                <h1 className='ui header'>Welcome to GoodPokes!</h1>
                <div>
                    Sign up here, or use the provided demo credentials.
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <p><label>Username
                            <input type='text' placeholder='Desired Username' value={this.state.userName} onChange={this.updateUsername} />
                        </label></p>

                        <p><label>Email
                            <input type='email'
                                placeholder='Email Address'
                                value={this.state.email} onChange={this.updateEmail} />
                        </label></p>

                        <p><label>Password
                            <input type='password' placeholder='Password' value={this.state.password}
                                onChange={this.updatePassword} />
                        </label></p>

                        <p><label>Confirm Password
                            <input type='password' placeholder='Confirm Password' value={this.state.confirmPassword}
                                onChange={this.updateConfirmPassword} />
                        </label></p>

                        <p><label>Date
                            <input type='date' placeholder='Date of Birth (YYYY-MM-DD)' value={this.state.birthday} onChange={this.updateBirthday} />
                        </label></p>

                        <p><label> Pronouns:
                        <input type='text' placeholder='Preferred Pronouns' value={this.state.pronouns} onChange={this.updatePronouns} />
                        </label></p>

                        <p>
                            <label>Starter Pokemon
                             <select name='starter' onChange={this.updateStarter}>
                                    <option value='bulbasaur'>Bulbasaur</option>
                                    <option value='charmander'>Charmander</option>
                                    <option value='squirtle'>Squirtle</option>
                                    <option value='pikachu'>Pikachu</option>
                                    <option value='eevee'>Eevee</option>
                                    <option value='chikorita'>Chikorita</option>
                                    <option value='cyndaquil'>Cyndaquil</option>
                                    <option value='totodile'>Totodile</option>
                                    <option value='treecko'>Treecko</option>
                                    <option value='torchic'>Torchic</option>
                                    <option value='mudkip'>Mudkip</option>
                                    <option value='turtwig'>Turtwig</option>
                                    <option value='chimchar'>Chimchar</option>
                                    <option value='piplup'>Piplup</option>
                                    <option value='snivy'>Snivy</option>
                                    <option value='tepig'>Tepig</option>
                                    <option value='oshawott'>Oshawott</option>
                                    <option value='chespin'>Chespin</option>
                                    <option value='fennekin'>Fennekin</option>
                                    <option value='froakie'>Froakie</option>
                                    <option value='rowlet'>Rowlet</option>
                                    <option value='litten'>Litten</option>
                                    <option value='popplio'>Popplio</option>

                                </select>
                            </label>
                        </p>
                        <span className='ui buttons'>
                            <button className='mini ui green button' type='submit'>Sign up!</button>
                            <NavLink className='mini ui button primary' to='/login'>Back To Login</NavLink>
                        </span>
                    </form>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (email, password, confirmPassword, userName, birthday, pronouns, starter) => (
            dispatch(signUp(email, password, confirmPassword, userName, birthday, pronouns, starter))
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
