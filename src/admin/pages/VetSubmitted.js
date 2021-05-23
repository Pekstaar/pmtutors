import {
    Button,
    createMuiTheme,
    CssBaseline,
    Paper,
    ThemeProvider,
} from "@material-ui/core";
import { Event, SystemUpdateAlt } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import useStyles from "../css/jobsubmitted.min.js"
import fb from "../../config/fbConfig"
import moment from "moment";
// import { AiOutlineFileWord } from "react-icons/ai";
import { NotificationManager } from "react-notifications"

const theme = createMuiTheme({
    background: {
        default: "#f4f5fd",
        marginTop: "1em"
    },
});

const VetSubmitted = (props) => {
    const classes = useStyles()

    // const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        title: "",
        url: "",
        uploadedat: "",
        uploadedby: "",
    })

    const { slug } = props.match.params;

    const handleReject = () => {
        fb.firestore().collection("clients").doc(slug)
            .update({ level: "vet_declined" })
            .then(() => {
                NotificationManager.warning("Test Rejected", "reject");
                window.location.pathname = "/pmtutorsadmin/vets/submitted/"
            })
            .catch(e => { throw e })
    }

    const handleApproval = () => {
        fb.firestore().collection("clients").doc(slug)
            .update({ level: "beginner" })
            .then(() => {
                NotificationManager.success("Test Successfully Approved", "Success");
                window.location.pathname = "/pmtutorsadmin/vets/submitted/"
            })
            .catch(e => { throw e })
    }

    useEffect(() => {
        const getJob = () => {

            fb.firestore().collection("submitted_vets").doc(slug).get()
                .then(r => setState({ ...r.data() }))
                .catch(e => NotificationManager.error(e.message))
        }
        getJob()
    })

    return (
        <ThemeProvider theme={theme}>
            <SideMenu />

            <div className={classes.adminMain}>
                <Header />

                <div className={classes.container}>
                    <h3>Submitted Test</h3>
                    <div className={classes.subbar}>
                        <span style={{ fontSize: "18px", color: "#ec4444", fontStyle: "lighter" }}>
                            {state.uploadedby}
                        </span>
                        <div>
                            <Event />
                            {moment(state.uploadedat && state.uploadedat.seconds && state.uploadedat.seconds * 1000).format('l')}
                        </div>
                    </div>
                    <div className={classes.body}>

                        {/* Attachmets: */}
                        <div style={{ margin: "0 5em" }}>
                            <strong style={{ fontFamily: "Roboto Slab" }}>
                                Attachments: <span style={{ fontStyle: "italic", fontWeight: 'lighter' }}>(Click on the document to download)</span>
                            </strong>
                            <br />
                            <div style={{ display: "flex" }}>
                                {
                                    // if (file.tag && file.tag.includes("word")) {

                                    state.url !== "" ?

                                        <a href={`${state.url}`} style={{ cursor: "pointer" }} >
                                            <Paper
                                                style={{ width: "150px", height: "150px", margin: "0 .2em", display: "grid", placeItems: "center" }}
                                            >
                                                <SystemUpdateAlt style={{ fontSize: "130px" }} />
                                            </Paper>
                                            <span style={{ fontStyle: "italic" }}>{`${state.url && state.url.substring(16, 46)}. . .`}</span>
                                        </a>
                                        :
                                        <h4>no Attachments</h4>

                                }

                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "3em 0" }}>
                            {/* buttons: approve job, decline job */}
                            <Button onClick={handleApproval} variant="contained" color="primary">
                                Approve Test
                                </Button>

                            <Button onClick={handleReject} variant="contained" color="secondary">
                                Reject Test
                                </Button>
                        </div>
                    </div>
                </div>

            </div>
            <CssBaseline />
        </ThemeProvider >
    );
};


export default (VetSubmitted);