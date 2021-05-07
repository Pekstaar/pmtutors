import {
    Button,
    createMuiTheme,
    CssBaseline,
    Paper,
    ThemeProvider,
    withStyles,
} from "@material-ui/core";
import { AccountBalanceWallet, Event, Label, SystemUpdateAlt } from "@material-ui/icons";
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

const JobSubmitted = (props) => {
    const classes = useStyles()

    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        title: "",
        description: "",
        requirements: "",
        takenby: "",
        submittedat: "",
        totalcost: "",
        category: "",
        attachments: [],
        submittedby: "",
    })

    const { slug } = props.match.params;



    useEffect(() => {
        const getJob = () => {
            setLoading(true)

            fb.firestore().collection("submitted").doc(slug).get()
                .then(r => setState({ ...r.data() }))
                .then(() => setLoading(false))
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
                    <h3>Submitted Jobs</h3>
                    <div className={classes.subbar}>
                        <span style={{ fontSize: "18px", color: "#ec4444", fontStyle: "lighter" }}>
                            {state.submittedby}
                        </span>
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
                    <div className={classes.body}>

                        <p style={{}}>
                            {state.description}
                        </p>

                        {/* Attachmets: */}
                        <div style={{ margin: "0 5em" }}>
                            <strong style={{ fontFamily: "Roboto Slab" }}>
                                Attachments: <span style={{ fontStyle: "italic", fontWeight: 'lighter' }}>(Click on the document to download)</span>
                            </strong>
                            <br />
                            <div style={{ display: "flex" }}>
                                {state.attachments && state.attachments.map((file, e) => {
                                    // if (file.tag && file.tag.includes("word")) {

                                    if (file.downloadURL && file.downloadURL !== "") {
                                        return (
                                            <a href={`${file.downloadURL}`} style={{ cursor: "pointer" }} key={e} >
                                                <Paper
                                                    style={{ width: "150px", height: "150px", margin: "0 .2em", display: "grid", placeItems: "center" }}
                                                >
                                                    <SystemUpdateAlt style={{ fontSize: "130px" }} />
                                                </Paper>
                                                <span style={{ fontStyle: "italic" }}>{`${file.downloadURL && file.downloadURL.substring(16, 46)}. . .`}</span>
                                            </a>
                                        )
                                    }

                                    // } else if (file.tag && file.tag.includes("image")) {
                                    //     return (
                                    //         <a href={`#`} style={{ cursor: "pointer" }}>
                                    //             <Paper
                                    //                 style={{ width: "150px", height: "150px", margin: "0 .2em" }}
                                    //             >
                                    //                 <img src={`#`} alt="upload file" />
                                    //             </Paper>
                                    //         </a>
                                    //     )
                                    // }
                                })}
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