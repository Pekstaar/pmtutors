import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Paper } from "@material-ui/core";
import fb from "../../config/fbConfig";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";

export const Register = ({ history }) => {
    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    // check if the user is logged in and send to homepage if true
    useEffect(() => {
        if (user && user.token) history.push("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let config = {};

        if (window.location.hostname.includes("localhost")) {

            config = {
                url: "http://localhost:3000/pmtutorsadmin/register/complete",
                handleCodeInApp: true,
            };
        } else {
            config = {
                url: "https://pmtutorshub.com/pmtutorsadmin/register/complete",
                handleCodeInApp: true,
            };
        }


        console.log(config.url);

        window.localStorage.setItem("registrationEmail", email);

        fb.auth().sendSignInLinkToEmail(email, config)
            .then(() => {
                NotificationManager.success(
                    `Email sent to ${email}. Click link to complete registration`
                );

                // store email on local storage


                //clear state
                setEmail("");
                // setTimeout(() => window.close(), 3000)
            }).catch(e => { throw e });
        // window.close();
    };

    const registerForm = () => (
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



            <Button type="submit" disabled={email.length < 3} color="primary" variant="contained" style={{ marginTop: "2em" }} >
                Register
            </Button>
        </form>
    );

    return (
        <Grid container style={{ height: "60vh" }}>
            <Grid item sm={5} style={{ margin: "auto" }}>
                <Paper style={{ padding: '3em', backgroundColor: "#1d1d1d30", fontFamily: "Roboto Slab" }}>
                    <h5> SIGN-UP</h5>
                    <span style={{ fontStyle: "italic" }}>pmtutors Admin</span>

                    {registerForm()}
                </Paper>
            </Grid>
        </Grid>

    );
};


