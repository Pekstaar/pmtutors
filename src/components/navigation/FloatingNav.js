import React from 'react';
// import { Avatar } from '@material-ui/core';
import { AccountBalanceWallet, Dashboard, ExitToApp, LiveHelp, Person, Work } from '@material-ui/icons';
import useStyles from '../../styling/floatingnav.min.js';
import { BiUpArrow } from 'react-icons/bi'
import { Link } from 'react-router-dom';

const FloatingNav = (props) => {
    const classes = useStyles();

    const relocate = (path) => <Link to={path} />
    return (
        <ul className={classes.root}>
            <BiUpArrow style={{ margin: "0 auto", marginTop: "-13px", backgroundColor: "#fff", color: "rgba(0,0,0,0.8)", fontSize: "25px", borderRadius: "50%" }} />
            <Link style={{ color: "#000000bf" }} to="/dashboard">
                <li onClick={() => { props.setDisplay(false); }}> <Dashboard /> Home</li>
            </Link>
            <Link style={{ color: "#000000bf" }} to="/quiz">
                <li onClick={() => { props.setDisplay(false); }}> <LiveHelp /> Quiz</li>
            </Link>
            <Link style={{ color: "#000000bf" }} to="/myjobs">
                <li onClick={() => { props.setDisplay(false); }}> <Work /> My Jobs</li>
            </Link>
            <Link style={{ color: "#000000bf" }} to="/account">
                <li onClick={() => { props.setDisplay(false); }}> <AccountBalanceWallet /> My Account</li>
            </Link>
            <Link style={{ color: "#000000bf" }} to="/profile">
                <li onClick={() => { props.setDisplay(false); }}> <Person /> My Profile</li>
            </Link>
            <li onClick={props.logout}> <ExitToApp /> logout</li>

            <span>pmtutorshub@gmail.com</span>
        </ul>
    );
}

export default FloatingNav;



