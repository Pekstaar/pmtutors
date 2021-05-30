import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Paper } from "@material-ui/core";
// import { authentication, googleAuthProvider } from "../../Firebase";
import fb from "../../config/fbConfig"
// import { SendOutlined } from "@ant-design/icons";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SendOutlined } from "@material-ui/icons";

// const { Password } = Input;

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // const dispatch = useDispatch();

    const user = useSelector((state) => (state.firebase.auth));



    // check if the user is logged in and send to homepage if true
    useEffect(() => {
        // console.log(state)
        if (user && user.uid) history.push("/pmtutorsadmin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);


        fb.auth().signInWithEmailAndPassword(
            email,
            password
        )
            .then(() => {
                window.location.pathname = ("/pmtutorsadmin");
                NotificationManager.success("Admin Signin success!");
            })
            .catch(e => {
                NotificationManager.error(e.message);
                setLoading(false);
            })
        // console.log(error);


    };


    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <Input
                style={{ height: "3.5em" }}
                type="email"
                placeholder="Enter your email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <Input
                style={{ height: "3.5em" }}
                placeholder="Input your Password"
                className="form-control my-3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* <button type="submit" className="btn btn-raised btn-secondary m-2">
        Login
      </button> */}
            <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                icon={<SendOutlined />}
                disabled={!email || password.length < 6}
            >
                Login
      </Button>
        </form>
    );

    return (
        <Grid container style={{ height: "60vh" }}>
            <Grid item sm={5} style={{ margin: "auto" }}>
                <Paper style={{ padding: '3em', backgroundColor: "#1d1d1d30", fontFamily: "Roboto Slab" }}>

                    {loading ? (
                        <h5 className="float-center mx-3 text-warning ">Loading...</h5>
                    ) : (
                        <div>
                            <h5 className="float-center mx-3">SIGN-IN</h5>
                            <span style={{ fontStyle: "italic" }}>pmtutors Admin</span>
                        </div>
                    )}

                    {loginForm()}

                    <small>
                        Have no account?
                        <Link
                            to="/pmtutorsadmin/register"
                            className="float-right  font-weight-bold"
                            style={{ color: "royalblue" }}
                        >
                            Click here!
                     </Link>
                    </small>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;