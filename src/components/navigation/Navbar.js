import React, {useState} from "react";
import { AppBar, Button, Toolbar, withStyles } from "@material-ui/core";
import {
  Create,
  List,
  Search,
} from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import useStyles from '../../styling/navbar.min.js'
import { signOut } from "../../store/actions/authAction.js";
import { connect } from "react-redux";
import FloatingNav from "./FloatingNav.js";
// import { Link } from "react-router-dom";
// import logout from "../../context/auth_context";

// import { Link } from "react-router-dom";

const DefaultNavigation = (props) => {

  const {classes, position} = props;
  const [display, setDisplay] = useState(false);

  const getFloat = () => {
    if(display === false){
      setDisplay(true)
      setTimeout(()=> setDisplay(false),15000)
      return <FloatingNav/>
    }
      setDisplay(false)   
  } 


  return (
    <>
      <AppBar className={classes.nav} position={position ? `${position}` : "static"}>
        <Toolbar className={classes.tools}>
          <div className={classes.logo}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.pathname = "/")}
            >
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

          <div >
            <Link to="/quiz" className={classes.item}>
              <Button color="primary">
                Take Question
              </Button>
            </Link>
            <Button variant="outlined" onClick={getFloat} style={{marginLeft:"3em",height:"34px"}} ><List style={{fontSize:"28px"}} /></Button>
            {
              display && display ?
              
                <FloatingNav setDisplay={setDisplay} logout={props.logout}/>
              :
                null
            }
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapDispatchToProps = (dispatch) =>{
  return {
    logout: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(DefaultNavigation));