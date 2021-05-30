import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Container, TextField } from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { Link, Redirect } from "react-router-dom";
import useStyles from "./css/signup.min.js"
import { connect, useSelector } from "react-redux";
import { signUp } from "../store/actions/authAction"
import fb from "../config/fbConfig"



const SignUp = ({ history, signUp }) => {
  const { firebase } = useSelector((state) => ({ ...state }))

  const classes = useStyles();


  const [level, setLevel] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let name = `${state.firstname} ${state.lastname}`;
    signUp(state);
    // console.log(r);
    history.push("/profile");

    // console.log(name, state.email, state.password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };



  useState(() => {
    const getLevel = () => {
      setIsLoading(true)

      fb.firestore().collection("clients").doc(firebase.auth.uid).get()
        .then(r => {
          if (r && r.data() && r.data().level) {

            setLevel(r.data().level);

            setIsLoading(false)

          }
          return
        })
    }
    getLevel()
  }, [])

  return (
    isLoading && <div>
      {
        firebase.auth && firebase.auth.uid ?
          (level && level === "to_vet") || (level && level === "vet_declined") ?
            < Redirect to="/vetting" />
            :
            <Redirect to="/dashboard" />
          :
          <div>
            <Container className={classes.root} maxWidth="md" spacing={3}>
              <Grid item md={8} sm={9} xs={12}>
                <Paper className={classes.paper}>
                  <h3 className={classes.head}>SIGN-UP</h3>
                  {/* login with google button */}
                  <Button
                    style={{ padding: "10px 20px", maxWidth: "400px" }}
                    variant="contained"
                  // onClick
                  >
                    <FcGoogle style={{ fontSize: "24px", marginRight: "8px" }} /> Sign
                Up with Google
              </Button>
                  <span style={{ color: "gray" }}>or signup with:</span>
                  {/* Inputs */}
                  <form
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                    onSubmit={handleSubmit}
                    className={classes.margin}
                  >
                    <Grid
                      container
                      className={classes.field}
                      spacing={1}
                      alignItems="flex-end"
                    >
                      <AccountCircle style={{ fontSize: "25px" }} />

                      <TextField
                        // id="input-with-icon-grid-1"
                        fullWidth
                        type="text"
                        name="firstname"
                        label="Input First name"
                        required
                        value={state.firstname}
                        onChange={handleChange}
                      />
                    </Grid>

                    <br />

                    <Grid
                      container
                      className={classes.field}
                      spacing={1}
                      alignItems="flex-end"
                    >
                      <AccountCircle style={{ fontSize: "25px" }} />

                      <TextField
                        // id="input-with-icon-grid-2"
                        fullWidth
                        type="text"
                        name="lastname"
                        label="Input lastname"
                        value={state.lastname}
                        onChange={handleChange}
                      />
                    </Grid>

                    <br />

                    <Grid
                      container
                      className={classes.field}
                      spacing={1}
                      alignItems="flex-end"
                    >
                      <AccountCircle style={{ fontSize: "25px" }} />

                      <TextField
                        // id="input-with-icon-grid-2"
                        fullWidth
                        type="text"
                        name="username"
                        label="Input username"
                        value={state.username}
                        onChange={(e) => setState({ ...state, username: e.target.value })}
                      />
                    </Grid>

                    <br />

                    <Grid
                      container
                      className={classes.field}
                      spacing={1}
                      alignItems="flex-end"
                    >
                      <MdEmail style={{ fontSize: "25px" }} />

                      <TextField
                        // id="input-with-icon-grid-2"
                        fullWidth
                        type="email"
                        name="email"
                        label="Input email"
                        required
                        value={state.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <br />

                    {/* Password */}
                    <Grid
                      container
                      className={classes.field}
                      spacing={1}
                      alignItems="flex-end"
                    >
                      <Lock style={{ fontSize: "25px" }} />

                      <TextField
                        // id="input-with-icon-grid-4"
                        fullWidth
                        type="password"
                        name="password"
                        label="Input Password"
                        required
                        value={state.password}
                        onChange={handleChange}
                      />
                    </Grid>
                    <br />
                    {/* Forgot passowrd */}
                    <Link to="/">Forgot password?</Link>
                    <br />

                    {/* Submit button */}
                    <Button
                      size="large"
                      style={{ width: "70%" }}
                      fullWidth
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      SIGNUP
                </Button>
                    <br />
                  </form>

                  {/* register if no account */}
                  <span>
                    Already have an account?
                <Link to="/login">Click here to Login</Link>
                  </span>
                </Paper>
              </Grid>
            </Container>
          </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);