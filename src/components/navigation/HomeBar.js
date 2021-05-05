  
import React from "react";
import { AppBar, Button, Toolbar, withStyles } from "@material-ui/core";
import { Create, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyles from "../../styling/homebar.min.js"

// import { Link } from "react-router-dom";

const HomeNavigation = ({ classes }) => {
  return (
    <>
      <AppBar className={classes.nav}>
        <Toolbar className={classes.tools}>
          <div className={classes.logo}>
            <span>
              <Create /> PMTutors
            </span>
          </div>

          <div className={classes.search}>
            <Search style={{ fontSize: "25px" }} />
            <input
              style={{
                height: "90%",
                background: "none",
              }}
              type="text"
              placeholder="Search"
            />
          </div>

          <ul className={classes.items}>
            <a className={classes.item} href="#t">
              Student
            </a>
            <a className={classes.item} href="#t">
              Tutor
            </a>

            <a href="#home" className={classes.item}>
              Home
            </a>
            <a href="#about" className={classes.item}>
              About
            </a>
            <a href="#contact" className={classes.item}>
              Contacts
            </a>

            <div className={classes.btns}>
              <Button
                variant="outlined"
                style={{ marginRight: "5px", fontWeight: "bold" }}
                color="primary"
              >
                <Link
                  style={{ textDecoration: "none", color: "auto" }}
                  to="/login"
                >
                  Login
                </Link>
              </Button>
              <Button
                style={{ fontWeight: "bold" }}
                variant="contained"
                color="secondary"
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/signup"
                >
                  SignUp
                </Link>
              </Button>
            </div>
          </ul>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withStyles(useStyles)(HomeNavigation);