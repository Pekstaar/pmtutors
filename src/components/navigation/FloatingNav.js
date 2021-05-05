import React from 'react';
import { Avatar } from '@material-ui/core';
import { AccountBalanceWallet, Dashboard, ExitToApp, LiveHelp, Person, Work } from '@material-ui/icons';
import useStyles from '../../styling/floatingnav.min.js';
import {BiUpArrow} from 'react-icons/bi'

const FloatingNav = (props) => {
    const classes = useStyles();

    const relocate = (path) => window.location.pathname = path
    return (
        <ul className={classes.root}>
            <BiUpArrow style={{margin:"0 auto", marginTop:"-13px", backgroundColor:"#fff", color:"rgba(0,0,0,0.8)",fontSize:"25px", borderRadius:"50%" }}/>
            <li onClick={() => {props.setDisplay(false); relocate("/dashboard")}}> <Dashboard/> Home</li>
            <li onClick={() => {props.setDisplay(false); relocate("/quiz")}} > <LiveHelp/> Quiz</li>
            <li onClick={() => {props.setDisplay(false); relocate("/myjobs")}}> <Work/> My Jobs</li>
            <li onClick={() => {props.setDisplay(false); relocate("/account")}}> <AccountBalanceWallet/> My Account</li>
            <li onClick={() => {props.setDisplay(false); relocate("profile")}}> <Person/> My Profile</li>
            <li onClick={props.logout}> <ExitToApp/> logout</li>
            <span>pmtutorshub@gmail.com</span>
        </ul>
    );
}

export default FloatingNav;



