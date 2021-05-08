import {
    createMuiTheme,
    CssBaseline,
    ThemeProvider,
    withStyles,
} from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import SubmittedVets from "../components/SubmittedVetsComponent";
import SideMenu from "../components/SideMenu";
import useStyles from "../css/admin.min.js"

const theme = createMuiTheme({
    background: {
        default: "#f4f5fd",
    },
});

const Vets = ({ classes }) => {
    return (
        <ThemeProvider theme={theme}>
            <SideMenu />

            <div className={classes.adminMain}>

                <Header />

                <SubmittedVets />
            </div>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default withStyles(useStyles)(Vets);