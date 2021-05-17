import {
    Button,
    createMuiTheme,
    CssBaseline,
    Paper,
    ThemeProvider,
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
import { connect, useSelector } from "react-redux";
import { makePayment } from "../../store/actions/paymentActions";
import PulseLoader from "react-spinners/RingLoader"

const theme = createMuiTheme({
    background: {
        default: "#f4f5fd",
        marginTop: "1em"
    },
});


const JobSubmitted = (props) => {
    const classes = useStyles()

    // const user = stat.firebase.auth

    // const [loading, setLoading] = useState(false)

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
    const [clientData, setClientData] = useState({})

    const override = `
      display:flex;
      align-items:center;
      justify-content: center;
      border-color:red;
      margin-top:8em;
      `;

    const { slug } = props.match.params;

    const approveJob = () => {
        // update my jobs as complete

        const firestore = fb.firestore()

        // get mydata 
        firestore.collection("clients").where("username", "==", state.submittedby)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // initialize payments db and set up its data
                    setClientData({ ...doc.data(), id: doc.id });
                    props.createPayment({
                        title: state.title,
                        tutor: doc.data().username,
                        balance: (parseInt(state.totalcost))
                    }, slug)

                    // update personal jobs in cart
                    firestore.collection("clients").doc(doc.id).collection("jobs").doc(slug)
                        .update({
                            my_status: "complete",
                            status: "completed",
                        })
                        .then(() => console.log("Job updated successfully"))
                        .catch(e => {
                            console.error(e);
                            return;
                        })

                    // initialize payment in my account
                    // my personal transactions set up
                    firestore.collection("clients").doc(doc.id).collection("mytransactions").doc(slug)
                        .set({
                            title: state.title,
                            tutor: doc.data().username,
                            balance: (parseInt(state.totalcost))
                        })

                    // update my total balance
                    firestore.collection("clients").doc(doc.id).update({ balance: (parseInt(state.totalcost) + parseInt(doc.data().balance)) })
                });
            })


        // total balance setup
        // set tutor balance
        // // // updated job at jobs db
        fb.firestore().collection("jobs").doc(slug)
            .update({
                status: "completed",
                my_status: "complete"
            })
            .then(() => console.log("jobs - job updated successfully"))
            .catch(e => { throw e })


    }

    const getJob = () => {
        // setLoading(true)

        fb.firestore().collection("submitted").doc(slug).get()
            .then(r => {
                // setLoading(false)
                setState({ ...r.data() });
            })
            .catch(e => {
                NotificationManager.error(e.message);
                // setLoading(false)
            })

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
                    {!state.id ?
                        <PulseLoader
                            css={override}
                            size={90}
                            color={"royalblue"}
                        />
                        :
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
                                    })}
                                </div>

                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "3em 0" }}>
                                {/* buttons: approve job, decline job */}
                                <Button variant="contained" color="primary" onClick={() => approveJob()}>
                                    Approve Job
                                </Button>

                                <Button variant="contained" color="secondary">
                                    Reject Job
                                </Button>
                            </div>
                        </div>
                    }
                </div>

            </div>
            <CssBaseline />
        </ThemeProvider >
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPayment: (payment, id) => dispatch(makePayment(payment, id)),
    }
}


export default connect(null, mapDispatchToProps)(JobSubmitted);