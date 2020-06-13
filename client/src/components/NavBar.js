import React from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from './LogoutButton';
import AddPokeButton from './AddPokeButton';
// import PokeByName from './PokeByName';



const NavBar = (props) => (
    //Navlinks to Home/Browse, My Collection, Friends, Profile
    <nav >
        {/* <PokeByName /> */}
        <span className='3 fluid ui buttons'>
            <NavLink className='tiny ui secondary button' exact to='/'>Home</NavLink>
            <NavLink className='tiny ui secondary button' exact to='/profile'>My Profile</NavLink>
            <LogoutButton />
        </span>
    </nav>
)

export const PokeNavBar = (props) => (
    <nav className='4 fluid ui buttons'>
        <NavLink className='tiny ui secondary button' exact to='/'>Home</NavLink>
        <NavLink className='tiny ui secondary button' exact to='/profile'>My Profile</NavLink>
        <AddPokeButton name={props.name} />
        <LogoutButton />
    </nav>
)

export default NavBar;
