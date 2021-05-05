import {
    createMuiTheme,
    CssBaseline,
    ThemeProvider,
    withStyles,
  } from "@material-ui/core";
  import React from "react";
  import Header from "../components/Header";
  import Job from "../components/Job";
  import SideMenu from "../components/SideMenu";
  import useStyles from "../css/admin.min.js"
  // import PageHeader from "../components/PageHeader";
  // import { Dashboard } from "@material-ui/icons";
  
  const theme = createMuiTheme({
    background: {
      default: "#f4f5fd",
    },
  });
  
  const Jobs = ({ classes }) => {
    return (
      <ThemeProvider theme={theme}>
        <SideMenu />
  
        <div className={classes.adminMain}>
          <Header />
            
          <Job />
        </div>
        <CssBaseline />
      </ThemeProvider>
    );
  };

  export default withStyles(useStyles)(Jobs);