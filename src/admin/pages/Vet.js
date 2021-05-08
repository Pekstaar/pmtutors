import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Vet from "../components/VetComponent";

const theme = createMuiTheme({
  background: {
    default: "#f4f5fd",
  },
});

const Vetting = ({ classes }) => {
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />

      <div className={classes.adminMain}>
        <Header />

        <Vet />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

const useStyles = {
  adminMain: {
    paddingLeft: "300px",
    width: "100%",
  },
};

export default withStyles(useStyles)(Vetting);