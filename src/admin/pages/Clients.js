import {
    createMuiTheme,
    CssBaseline,
    ThemeProvider,
    withStyles,
} from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import Client from "../components/Client";
import SideMenu from "../components/SideMenu";
import useStyles from "../css/admin.min.js"

const theme = createMuiTheme({
    background: {
        default: "#f4f5fd",
    },
});

const Clients = ({ classes }) => {
    return (
        <ThemeProvider theme={theme}>
            <SideMenu />

            <div className={classes.adminMain}>

                <Header />

                <Client />
            </div>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default withStyles(useStyles)(Clients);