import React, { useContext } from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import UserContext from '../../Context';
import styles from './index.module.css';


const Header = () => {
    const context = useContext(UserContext);

    const history = useHistory();
    const loggedIn = context.user && context.user.loggedIn;

    const logout = () => {
        context.logOut();
        history.push('/');
    }
        
        return (
            <header className={styles.header}>
                <Link to="/">Event Center</Link>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">How it works</NavLink>
                {loggedIn ? <NavLink to="/data/event">Create event</NavLink> : null}
                {loggedIn ? <NavLink to="/users/profile">My events</NavLink> : null}
                {loggedIn ? null : <NavLink to="/users/login">Login</NavLink>}
                {loggedIn ? <NavLink to="/users/logout" onClick={logout}>Logout</NavLink> : null}
                {loggedIn ? null : <NavLink to="/users/register">Register</NavLink>}
            </header>
        )
    }


export default Header;
