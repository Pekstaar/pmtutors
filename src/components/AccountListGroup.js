import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import paypal from '../images/paypal.jpg'
import mpesa from '../images/mpesa.jpeg'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function AccountListGroup(props) {
    const classes = useStyles();

    const handleClick = (toOpen) => {
        props.setOpen(toOpen);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" style={{ borderBottom: "1px solid gray" }} id="nested-list-subheader">
                    Set your preffered account
                </ListSubheader>
            }
            className={`${classes.root}`}
        >
            <ListItem button onClick={() => { handleClick("mpesa"); props.getPaymentSetUp("mpesa") }}>
                <ListItemIcon>
                    <Avatar src={mpesa} />
                </ListItemIcon>
                <ListItemText primary="M-pesa (preferred)" />
            </ListItem>
            <ListItem button onClick={() => { handleClick("paypal"); props.getPaymentSetUp("paypal") }}>
                <ListItemIcon>
                    <Avatar src={paypal} />
                </ListItemIcon>
                <ListItemText primary="Paypal" />
            </ListItem>

        </List>
    );
}