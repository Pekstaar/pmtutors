import {
    Button,
    createMuiTheme,
    CssBaseline,
    // Grid,
    Paper,
    ThemeProvider,
} from "@material-ui/core";
import { AccountBalanceWallet, DoneAll, Event, Label, SystemUpdateAlt } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import useStyles from "../css/jobsubmitted.min.js"
import fb from "../../config/fbConfig"
import { NotificationManager } from "react-notifications"
import moment from "moment";
// import { AiOutlineFileWord } from "react-icons/ai";
import { connect } from "react-redux";
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
        jobtitle: "",
        description: "",
        requirements: "",
        takenby: "",
        submittedat: "",
        totalcost: "",
        category: "",
        attachments: [],
        submittedby: "",
    })
    const [payment, setPayment] = useState()

    const override = `
      display:flex;
      align-items:center;
      justify-content: center;
      border-color:red;
      margin-top:8em;
      `;

    const { slug } = props.match.params;
    const firestore = fb.firestore()

    const approveJob = () => {
        // update my jobs as complete

        // console.log(state.jobtitle)

        // get mydata 
        firestore.collection("clients").where("username", "==", state.submittedby)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // initialize payments db and set up its data
                    // setClientData({ ...doc.data(), id: doc.id });
                    props.createPayment({
                        title: state.jobtitle,
                        tutor: doc.data().username,
                        balance: (parseInt(state.totalcost, 10))
                    }, slug)

                    // update personal jobs in cart
                    firestore.collection("clients").doc(doc.id).collection("jobs").doc(slug)
                        .update({
                            my_status: "complete",
                            status: "completed",
                        })
                        .then(() => console.log("myjobs db job updated successfully to complete"))
                        .catch(e => {
                            console.error(e);
                            return;
                        })

                    // initialize payment in my account
                    // my personal transactions set up
                    firestore.collection("clients").doc(doc.id).collection("mytransactions").doc(slug)
                        .set({
                            title: state.jobtitle,
                            tutor: doc.data().username,
                            balance: (parseInt(state.totalcost, 10)),
                            settledat: new Date()
                        })
                        .then(() => console.log("data added to my-transactions successfully"))

                    firestore.collection("submitted").doc(slug).update({ status: "verified" })
                        .then(() => console.log("Submission db updated successfully."))

                    // update my total balance
                    firestore.collection("clients").doc(doc.id).update({ balance: (parseInt(state.totalcost, 10) + parseInt(doc.data().balance, 10)) })
                });
            })


        // total balance setup
        // set tutor balance
        // // // updated job at jobs db
        fb.firestore().collection("jobs").doc(slug)
            .update({
                status: "completed",
                // my_status: "complete"
            })
            .then(() => console.log("jobs - job updated successfully"))
            .catch(e => { throw e })

        NotificationManager.success("Job Approved")
        props.history.push("/pmtutorsadmin/jobs")

    }

    const rejectJob = () => {
        firestore.collection("clients").where("username", "==", state.submittedby)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    firestore.collection("clients").doc(doc.id).collection("jobs").doc(slug)
                        .update({
                            my_status: "rejected",
                            status: "waiting",
                        })
                        .then(() => console.log("myjobs db job updated successfully to rejection"))
                        .catch(e => {
                            console.error(e);
                            return;
                        })
                })
            })

        fb.firestore().collection("jobs").doc(slug)
            .update({
                status: "rejected",
                // my_status: "complete"
            })
            .then(() => {
                console.log("jobs - job updated successfully")
                NotificationManager.warning("Job rejected")
                props.history.push("/pmtutorsadmin/jobs")
            })
            .catch(e => { throw e })


    }

    useEffect(() => {
        // setLoading(true)
        const getJob = async () => {

            const jb = await fb.firestore().collection("submitted").doc(slug)
            jb.onSnapshot(doc => {
                setState({ ...doc.data(), id: jb.id });
            })
            // console.log(jb.id)
            // .then(r => {
            //     // setLoading(false)
            // setLoading(false)

        }

        const getPayment = async () => {
            const pay = await fb.firestore().collection("payments").doc(slug)
            try {
                pay.onSnapshot(doc => setPayment(doc.data()))
            } catch (e) {
                console.error(e)
            }
        }
        // setLoading(false)
        getJob()
        getPayment()

        // return () => {
        //     setPayment("")
        // }
    })

    return (
        <ThemeProvider theme={theme}>
            <SideMenu />

            <div className={classes.adminMain}>
                {/* <Header />  */}

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
                             ${parseInt((state.totalcost / 100), 10)}
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
                            // loading={loading}
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
                                        return ""
                                    })}
                                </div>

                            </div>
                            {state.status && state.status === "verified" ?
                                <div className="container" spacing={2}>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-7 d-flex my-3" style={{ backgroundColor: '#4BB543', margin: "auto", padding: ".5em 0", color: "#fff" }}>
                                            <span className="m-auto">Job Approved!&nbsp;&nbsp;&nbsp;<DoneAll style={{ fontSize: "35px" }} /></span>
                                        </div>
                                        <div className="col-3 d-flex gap-2 justify-content-around align-items-center">
                                            <Button style={{ minWidth: "280px" }} disabled={payment && payment.status && payment.status === "settled"} onClick={() => { settleBalance(slug, state); props.history.push("/pmtutorsadmin/jobs") }} variant="outlined" color="primary">
                                                {payment && payment.status && payment.status === "settled" ?
                                                    <div>
                                                        Balance Settled:
                                                        <span style={{ fontSize: "18px" }}> &nbsp;{`  ${state.totalcost}`}</span>
                                                    </div>
                                                    :
                                                    <div>
                                                        Settle Balance:
                                                        <span style={{ fontSize: "18px" }}> &nbsp;{`  ${state.totalcost}`}</span>
                                                    </div>

                                                }
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "3em 0" }}>
                                    {/* buttons: approve job, decline job */}
                                    <Button variant="contained" color="primary" onClick={() => approveJob()}>
                                        Approve Job
                                </Button>

                                    <Button onClick={() => rejectJob()} variant="contained" color="secondary">
                                        Reject Job
                                </Button>
                                </div>
                            }
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

export const settleBalance = async (slug, state) => {
    if (window.confirm(`Are You sure you want to Settle ${state.totalcost} Balance? `)) {
        const clientDb = fb.firestore().collection("clients")
        const payment = fb.firestore().collection("payments")
        const data = await payment.doc(slug).get()
        const clients = await clientDb.get()
        // console.log(data.data().tutor)

        let list = []
        clients.forEach(e => list.push({ username: e.data().username, id: e.id, balance: e.data().balance }))
        // setPayment(list)
        const client = list.find(d => d.username === data.data().tutor)
        const bal = (parseInt(client.balance, 10) - parseInt(state.totalcost, 10))
        // console.log(client)

        // update payment db to settled
        try {
            await payment.doc(slug).update({ status: "settled" })
            console.log("payment db update successful to settled!")

            await clientDb.doc(client.id).collection("mytransactions").doc(slug).update({ status: "settled" })
            await clientDb.doc(client.id).update({ balance: bal })
            console.log("mytransactionDB updated successfully")
            NotificationManager.success("Balance settled Successfully!")
        }
        catch (e) {
            console.error(e)
        }
        // console.log()

    }
}