import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Container, TextField } from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { Link, Redirect } from "react-router-dom";
import useStyles from "./css/login.min.js"
import { connect, useSelector } from "react-redux";
import { signIn } from "../store/actions/authAction.js";
import { getClient } from "../store/actions/clientAction.js";
const Login = (props) => {
  // const {history} = props; 

  const {firebase} = useSelector((state) => ({...state}))

  const auth = firebase.auth


    const classes = useStyles();
  
    // auth context

    const [state, setState] = useState({
      email: "",
      password: "",
    });
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        props.login(state);
       
        // history.push("/dashboard");
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setState({
        ...state,
        [name]: value,
      });
    };
  
    return (
      <>
       { (auth && auth.uid)? 

        <Redirect to="/dashboard"/> 

        :

        <div>
          <Container className={classes.root} maxWidth="md" spacing={3}>
            <Grid item md={8} sm={9} xs={12}>
              <Paper className={classes.paper}>
                <h3 className={classes.head}>LOGIN</h3>
                {/* login with google button */}
                <Button
                  style={{ padding: "10px 20px", maxWidth: "400px" }}
                  variant="contained"
                  // onClick={async () => {
                  //   // NotificationManager.error("Hello", 3000);
                  //   await loginWithGoogle()
                  //     .then((r) => {
                  //       // set global credentials
                  //       setCredentials({
                  //         ...credentials,
                  //         uid: r.user.uid,
                  //         url: r.user.url,
                  //       });
                  //       NotificationManager.success(r.message);
                  //     })
                  //     .catch((e) => NotificationManager.error(e.message));
                  // }}
                >
                  <FcGoogle style={{ fontSize: "24px", marginRight: "8px" }} />{" "}
                  Login with Google
                </Button>
                <span style={{ color: "gray" }}>or Login with:</span>
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
                      fullWidth
                      type="email"
                      name="email"
                      label="Input email/username"
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
                    color="primary"
                    type="submit"
                  >
                    LOGIN
                  </Button>
                  <br />
                </form>
    
                {/* register if no account */}
                <span>
                  Have no account?<Link to="/signup">Click here to Register</Link>
                </span>
              </Paper>
            </Grid>
          </Container>
        </div>
    }
    </>
    );
  };

  const mapStateToProps = (state) =>{
    
    return {
      auth: state.firebase.auth
    }
  }

  const mapDispatchToProps = (dispatch) =>{
    
      return {
          login: (creds) => dispatch(signIn(creds))
      }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);