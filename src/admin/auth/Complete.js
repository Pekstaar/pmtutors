import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Paper } from "@material-ui/core";
import fb from "../../config/fbConfig";
import { NotificationManager } from "react-notifications";

const Complete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    // const dispatch = useDispatch();

    // const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setEmail(window.localStorage.getItem("registrationEmail"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (confirmPassword !== password) {
            NotificationManager.error("Passwords do not Match!");
            return;
        }

        if (!email || !password) {
            NotificationManager.error("Email and password required");
            return;
        }

        if (password.length < 6) {
            NotificationManager.error("Password must be atleast 6 characters Long");
            return;
        }

        try {
            const result = await fb.auth().signInWithEmailLink(
                email,
                window.location.href
            );

            if (result.user.emailVerified) {
                //   remove userEmail form localStorage


                // get User id

                let user = fb.auth().currentUser;

                user.updatePassword(password)
                    .then(() => {
                        NotificationManager.success(`${email} Registered Successfully!`);
                        history.push("/pmtutorsadmin");
                    });
                window.localStorage.removeItem("registrationEmail");


                // redirect
            }
        } catch (error) {
            NotificationManager.error(error.message);
        }
    };

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <Input
                style={{ height: "3.5em" }}
                // type="email"
                className="form-control"
                value={email}
                disabled
            />

            <Input
                style={{ height: "3.5em" }}
                type="password"
                placeholder="Input Password"
                className="form-control my-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
            />

            <Input
                style={{ height: "3.5em" }}
                placeholder="confirm Password"
                type="password"
                className="form-control mt-1 mb-3"
                value={confirmPassword}
                onChange={(e) => setConfirm(e.target.value)}
            />
            <Button color="primary" variant="contained" type="submit">
                Register Admin
      </Button>
        </form>
    );

    return (

        <Grid container style={{ height: "60vh" }}>
            <Grid item sm={5} style={{ margin: "auto" }}>
                <Paper style={{ padding: '3em', backgroundColor: "#1d1d1d30", fontFamily: "Roboto Slab" }}>
                    <h5>Complete Signup </h5>
                    {completeRegistrationForm()}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Complete;