import {
    Button,
    createMuiTheme,
    CssBaseline,
    Paper,
    ThemeProvider,
    withStyles,
} from "@material-ui/core";
import { AccountBalanceWallet, Event, Label } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import useStyles from "../css/jobsubmitted.min.js"
import fb from "../../config/fbConfig"
import moment from "moment";
import { AiOutlineFileWord } from "react-icons/ai";

const theme = createMuiTheme({
    background: {
        default: "#f4f5fd",
        marginTop: "1em"
    },
});

const JobSubmitted = (props) => {
    const classes = useStyles()

    const [state, setState] = useState({
        title: "",
        description: "",
        requirements: "",
        takenby: "",
        submittedat: "",
        totalcost: "",
        category: "",
        attachments: [],
    })

    const { slug } = props;

    const getJob = () => {

        fb.firestore().collection("submitted").doc(slug).get()
            .then(r => setState({ ...state }))
            // .then(() => )
            .catch(e => console.error(e.message))
    }

    useEffect(() => {
        getJob()
    })

    return (
        <ThemeProvider theme={theme}>
            <SideMenu />

            <div className={classes.adminMain}>
                <Header />

                <div className={classes.container}>
                    <h3>Submitted Jobs</h3>
                    <div className={classes.subbar}>
                        <div>
                            <Label />
                            {state.category}
                        </div>
                        <div>
                            <AccountBalanceWallet />
                             ${parseInt(state.totalcost / 100)}
                        </div>
                        <div>
                            <Event />
                            {moment(state.submittedat && state.submittedat.seconds && state.submittedat.seconds * 1000).format('l')}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                fontFamily: "Roboto Slab",
                            }}
                        >
                        </div>
                        <p style={{ overflowX: "hidden" }}>
                            {state.description}
                        </p>

                        {/* Attachmets: */}
                        <div style={{ margin: "0 5em" }}>
                            <strong style={{ fontFamily: "Roboto Slab" }}>
                                Attachments: <span style={{ fontStyle: "italic", fontWeight: 'lighter' }}>(Click on the document to download)</span>
                            </strong>
                            <br />
                            <div style={{ display: "flex" }}>
                                {state.attachments && state.attachments.map(file => {
                                    if (file.tag.includes("word")) {
                                        return (
                                            <>
                                                <a href={`${file.downloadURL}`} style={{ cursor: "pointer" }}>
                                                    <Paper
                                                        style={{ width: "150px", height: "150px", margin: "0 .2em" }}
                                                    >
                                                        <AiOutlineFileWord style={{ fontSize: "130px" }} />
                                                    </Paper>
                                                </a>
                                            </>
                                        )
                                    } else if (file.tag.includes("image")) {
                                        return (
                                            <a href={`${file.downloadURL}`} style={{ cursor: "pointer" }}>
                                                <Paper
                                                    style={{ width: "150px", height: "150px", margin: "0 .2em" }}
                                                >
                                                    <img src={`${file.downloadURL}`} alt="upload file" />
                                                </Paper>
                                            </a>
                                        )
                                    }
                                })}

                                <a href={`${state.attachments.downloadURL}`}>
                                    <Paper
                                        style={{ width: "150px", height: "150px", margin: "0 .2em" }}
                                    >
                                        <AiOutlineFileWord style={{ fontSize: "130px" }} />
                                    </Paper>
                                </a>
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "3em 0" }}>
                            {/* buttons: approve job, decline job */}
                            <Button variant="contained" color="primary">
                                Approve Job
                                </Button>

                            <Button variant="contained" color="secondary">
                                Reject Job
                                </Button>
                        </div>
                    </div>
                </div>

            </div>
            <CssBaseline />
        </ThemeProvider >
    );
};


export default withStyles(useStyles)(JobSubmitted);