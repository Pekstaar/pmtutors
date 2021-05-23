import { Avatar, Button, Grid, Paper } from "@material-ui/core";
import { Check, Clear, MoreHoriz, Star } from "@material-ui/icons";
import React from "react";
import Navbar from "../components/navigation/Navbar";
import useStyles from "../styling/dashboard.min.js"
import fb from "../config/fbConfig"
import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

const Dashboard = (props) => {
  // styling:
  const classes = useStyles();

  // const {firebase} = useSelector((state) => ({...state}))

  const [state, setState] = useState({})
  // context
  const getUser = () => {
    fb.firestore().collection("clients").doc(props.user.uid).get()
      .then(r => setState({
        ...r.data()
      }))
  }

  useEffect(() => {
    getUser()
  });



  // destructrue details
  const { username, email, skills } = state;

  return (
    <>
      <Navbar />
      <Grid container className={classes.container}>
        <Grid
          container
          item
          md={8}
          style={{
            backgroundColor: "#fdfdfdc7",
            padding: "1em 2em ",
            marginBottom: ".2em",
          }}
        >
          {/* details */}

          <Grid
            item
            md={12}
            style={{
              height: "100px",
              padding: "0 2em",
              marginBottom: "1em",
            }}
          >
            <div className={classes.data}>
              <Avatar style={{ height: "70px", width: "70px" }}>
                {username ? username.charAt(0) : ""}
              </Avatar>
              <div>
                <h3 style={{ color: "#411494", fontFamily: "Roboto Slab" }}>
                  {username}
                </h3>
                <span
                  style={{
                    fontWeight: "lighter",
                    fontSize: "18px",
                    color: "#411494",
                    fontFamily: "Roboto Slab",
                  }}
                >
                  {email}
                </span>
              </div>
              <div>
                <span style={{ fontSize: "20px", fontFamily: "Roboto Slab" }}>
                  Rating:
                </span>
                100% <br />
                <Star style={{ color: "#c7cc2c", fontSize: "30px" }} />
                <Star style={{ color: "#c7cc2c", fontSize: "30px" }} />
                <Star style={{ color: "#c7cc2c", fontSize: "30px" }} />
                <Star style={{ color: "#c7cc2c", fontSize: "30px" }} />
                <Star style={{ color: "#c7cc2c", fontSize: "30px" }} />
              </div>

              <div>
                <span style={{ fontFamily: "Roboto Slab", fontSize: "18px" }}>
                  skills:{"  "}
                </span>
                {skills}
              </div>
              {/* <Link to="/myprofile"> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.location.pathname = "/profile";
                }}
                style={{
                  width: "170px",
                  padding: ".5em, 0",
                  marginTop: "1.5em",
                }}
              >
                My-Profile
              </Button>
              {/* </Link> */}
            </div>
          </Grid>
          {/* Cards buttons */}
          <Grid item md={12} className={classes.cards}>
            <Paper className={classes.card}>
              <h6 style={{ color: "#411494" }}>Quiz Bank</h6>
              <p>
                Have no task?
                <br /> Click on the Button below
                <br /> to access tasks <br />{" "}
                <strong> Access questions here!</strong>
              </p>
              <Link to="/quiz">
                <Button variant="outlined" color="primary">
                  <small > quiz bank</small>
                </Button>
              </Link>
            </Paper>
            <Paper className={classes.card}>
              <h6 style={{ color: "#ca3131" }}>Account</h6>
              <p>
                Need to view your earnings?
                <br /> Click on the Button below
                <br /> to access Your account <br />{" "}
                <strong>
                  {" "}
                </strong>
              </p>
              <Link to="/account">
                <Button variant="outlined" color="secondary">
                  <small>My Account</small>
                </Button>
              </Link>
            </Paper>
          </Grid>
          {/* task history */}
          <Grid item md={12} className={classes.history}>
            <Paper className={classes.task}>
              <h4
                style={{
                  color: "#411494",
                  borderBottom: "2px solid #411494 ",
                  fontFamily: "Roboto Slab",
                  width: "150px",
                }}
              >
                Task History
              </h4>

              <div>
                <h6 style={{ margin: "0" }}>
                  Excel Sheet Management with panda
                </h6>

                <span style={{ color: "rgba(0,0,0,0.5)" }}>12 may 2021</span>

                <div style={{ color: "#4BB543" }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Check style={{ fontSize: "30px" }} />
                    {"   "}
                    <small>completed</small>
                  </span>
                </div>
              </div>

              <div>
                <h6 style={{ margin: "0" }}>
                  Excel Sheet Management with panda
                </h6>

                <span style={{ color: "rgba(0,0,0,0.5)" }}>12 may 2021</span>

                <div style={{ color: "rgba(0,0,0,0.6)" }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <MoreHoriz style={{ fontSize: "30px" }} />
                    {"      "}
                    <small>Waiting</small>
                  </span>
                </div>
              </div>
              <div>
                <h6 style={{ margin: "0" }}>
                  Excel Sheet Management with panda
                </h6>

                <span style={{ color: "rgba(0,0,0,0.5)" }}>12 may 2021</span>

                <div style={{ color: "#4BB543" }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Check style={{ fontSize: "30px" }} />
                    <small>completed</small>
                  </span>
                </div>
              </div>

              <div>
                <h6 style={{ margin: "0" }}>
                  Excel Sheet Management with panda
                </h6>

                <span style={{ color: "rgba(0,0,0,0.5)" }}>12 may 2021</span>

                <div style={{ color: "rgba(0,0,0,0.6)" }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <MoreHoriz style={{ fontSize: "30px" }} />
                    {"      "}
                    <small>Waiting</small>
                  </span>
                </div>
              </div>

              {/* task 2 */}
              <div>
                <h6 style={{ margin: "0" }}>
                  Define the purpose of a constitution
                </h6>

                <span style={{ color: "rgba(0,0,0,0.5)" }}>19 April 2021</span>

                <div style={{ color: "#ff3333" }}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Clear style={{ fontSize: "30px" }} />
                    {"   "}
                    <small>cancelled!</small>
                  </span>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Dashboard);