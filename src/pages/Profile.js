import {
  Avatar,
  Button,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
//   import Navbar from "../components/navigation/Navbar.js ";
import Navbar from '../components/navigation/Navbar.js';
import useStyles from "../styling/profile.min.js"
import { getClient, updateProfile } from "../store/actions/clientAction"
import { compose } from "redux"
import { connect, useSelector } from "react-redux"
import { firestoreConnect } from "react-redux-firebase";
import fb from "../config/fbConfig"


// import { getClient } from "./admin/data/ClientData";

const Profile = (props) => {

  const { firebase } = useSelector((state) => ({ ...state }))


  const { history } = props;


  // props.getClient(firebase.auth.uid)

  const classes = useStyles();
  // states
  const [state, setState] = useState({
    name: "",
    username: "",
    email: "",
    phonenumber: "",
    residence: "",
    about: "",
    skills: "",
    balance: "",
    study: "",
  });

  const getUser = () => {
    fb.firestore().collection("clients").doc(firebase.auth.uid).get()
      .then(r => setState({
        ...r.data()
      }))
  }


  // destructuring
  const {
    name,
    username,
    email,
    phonenumber,
    residence,
    about,
    skills,
    study
  } = state;

  // functions:
  // handle inputs change
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    props.update(firebase.auth.uid, state)

    history.push("/dashboard");
  };

  useEffect(() => {
    getUser()
  });

  return (
    <div>
      <Navbar />
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
      >
        {/* row 1 */}
        <Grid item sm={7} className={classes.header}>
          <div
            className="top"
            style={{
              borderBottom: "1px solid gray",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1em 0",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                color: "rgba(0,0,0,0.8)",
                margin: "0 3em ",
                fontFamily: "Varela Round",
              }}
            >
              {username}
            </span>
            <Button
              style={{
                textTransform: "capitalize",
                fontWeight: "normal",
                marginRight: "2em",
              }}
              variant="outlined"
              color="secondary"
            >
              Edit Profile
              </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              style={{
                height: "90px",
                width: "90px",
                margin: ".6em",
                fontSize: "50px",
              }}
            >
              {username && username.charAt(0)}
            </Avatar>
            <div>
              <strong>{state.fullname}</strong>

              <p>{email}</p>
            </div>
          </div>
        </Grid>

        {/* details */}
        <Grid
          container
          item
          sm={7}
          direction="row"
          //   justify="center"
          alignItems="center"
          className={classes.fields}
        >
          <div
            className="top"
            style={{
              width: "100%",
              borderBottom: "1px solid grey",
              padding: "1em",
            }}
          >
            <span style={{ fontFamily: "Varela Round", fontSize: "17px" }}>
              information
              </span>
          </div>
          {/* <form action="" style={{ width: "100%" }}> */}
          <Grid item sm={6} className={classes.field}>
            <label htmlFor="">Fullname</label>
            <br />
            <TextField
              type="text"
              variant="outlined"
              required
              autoFocus
              value={name}
              name="name"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} className={classes.field}>
            <label htmlFor="">Username</label>
            <br />
            <TextField
              type="text"
              variant="outlined"
              required
              value={username}
              name="username"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} className={classes.field}>
            <label htmlFor="">Email</label>
            <br />
            <TextField
              type="text"
              variant="outlined"
              required
              value={email}
              name="email"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} className={classes.field}>
            <label htmlFor="">Contact</label>
            <br />
            <TextField
              type="text"
              variant="outlined"
              required
              value={phonenumber}
              name="phonenumber"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} className={classes.field}>
            <label htmlFor="">Residence</label>
            <br />
            <TextField
              type="text"
              variant="outlined"
              required
              placeholder="County/Homearea "
              value={residence}
              name="residence"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6} className={classes.field}>
            <label htmlFor="">Studied At</label>
            <br />
            <TextField
              type="text"
              variant="outlined"
              required
              placeholder="input your study institution "
              value={study}
              name="study"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6} className={classes.field}>
            <label htmlFor="">Skills</label>
            <br />
            <TextField
              type="text"
              variant="outlined"
              required
              placeholder="ux-design . . . "
              value={skills}
              name="skills"
              className={classes.input}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={12} className={classes.field}>
            <label htmlFor="">About</label>
            <br />
            <TextareaAutosize
              type="text"
              variant="outlined"
              required
              placeholder="Give a brief description about your self . . . "
              value={about}
              name="about"
              onChange={handleChange}
              style={{
                height: "110px",
                borderRadius: "1em",
                background: "none",
                width: "100%",
                padding: ".5em",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </Grid>
          <Grid item sm={7} style={{ margin: ".4em auto" }}>
            <Button
              style={{ width: "60%", padding: ".8em 0", fontSize: "15px" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              onChange={handleChange}
            >
              Save
              </Button>
          </Grid>
          {/* </form> */}
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (id, data) => dispatch(updateProfile(id, data)),
    getClient: (id) => dispatch(getClient(id))
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    clients: state.firestore.ordered.clients,
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => [
    {
      collection: "clients",
    }
  ])
)(Profile);