
import { Avatar, Button, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import { NotificationManager } from "react-notifications";
import moment from "moment";

import { AccountBalanceWallet, Alarm, Event, Label } from "@material-ui/icons";
import { AiOutlineFileWord } from "react-icons/ai";
import Navbar from "../components/navigation/Navbar";
import useStyles from "../styling/quiz.min.js"
import fb from "../config/fbConfig"
import NotificationManager from "react-notifications/lib/NotificationManager";
import { submitJob, updateJob } from "../store/actions/jobAction";
import { connect } from "react-redux";
import { addClientJob } from "../store/actions/clientAction";
import Upload from "../components/uploader";
import LinearProgressWithLabel from "../components/progress"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DoneAll from '@material-ui/icons/DoneAll';
import ScaleLoader from "react-spinners/ScaleLoader"

// import { getClient } from "./admin/data/ClientData";

const Quiz = (props) => {
  const classes = useStyles();

  const { match } = props;

  const { slug } = match.params;

  // console.log(credentials);
  // states
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(() => 0)
  const [loading, setLoading] = useState(false)
  const [data, setdata] = useState({
    attachments: [],
  })
  const [values, setValues] = useState({
    title: "",
    description: "",
    requirements: "",
    createdby: "",
    createdat: "",
    totalcost: "",
    pagecost: "",
    deadline: "",
    category: "",
    postedby: "",
    status: ""
    // jobs: [],
  });
  // destructuring
  const {
    title,
    description,
    requirements,
    createdby,
    createdat,
    totalcost,
    deadline,
    category,
    // jobs,
  } = values;

  // get details to update - getone
  const getDetails = async () => {
    setLoading(true)
    const data = await fb.firestore().collection("jobs").doc(slug).get()
    // console.log(data.id)
    if (data.data() && data.data().status && (data.data().status === "taken" || data.data().status === "rejected")) {
      // setValues({ ...data.data(), id: data.id })
      // setLoading(false)
      setUploadDisplay(true)
      // return

    }
    setLoading(false)
    setValues({ ...data.data(), id: data.id })

  };

  //   Take task function:    
  const takeTask = () => {
    // update job in firestore
    fb.firestore().collection("jobs").doc(slug).update({
      status: "taken",
      takenby: "signed_in_client",
      my_status: "pending"
    })
      .then(() => console.log("Update success!"))
      .catch(e => console.error(e.message))

    // getJob from database again
    // add full job details to myJobs subcollection
    fb.firestore().collection("jobs").doc(slug).get()
      .then(r => props.addJob(props.user && props.user.uid, slug, r.data()))

    // // render the upload jobs section
    setUploadDisplay(true)
  }

  const updatedata = async () => {
    const events = await fb.firestore().collection('clients').doc(props.user.uid).collection("jobs")

    // const { attach } = data
    try {
      // update tutor jobs
      events.doc(slug).update(data)

      // update general job:
      fb.firestore().collection("jobs").doc(slug).update(data)
        .then(() => console.log("Jobs update successfull"))

      NotificationManager.success("Documents uploaded Successfully!", "success", 4000)
    } catch (error) {
      console.error("data update error", error.message)
    }
  }

  const jobSubmission = async () => {
    const client = props.clients.find(e => e.id === props.user.uid)
    // const conn = fb.firestore().collection("clients").doc(props.user.uid).collection("jobs")
    // // const data = await conn.doc(slug).get()
    // console.log(data.data())
    // console.log(client.username)
    fb.firestore().collection("jobs").doc(slug).update({ status: "submitted" })
    const submissionData = {
      attachments: data.attachments,
      jobtitle: values.title,
      description: values.description,
      category: values.category,
      createdby: values.createdby,
      totalcost: values.totalcost,
      pagecost: values.pagecost,
    }
    try {
      props.submitJob(slug, submissionData, client);
      getDetails();
    } catch (e) { throw e }

  }
  const override = `
      display:flex;
      align-items:center;
      justify-content: center;props
      border-color:red;
      `;


  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.status]);

  return (
    <>
      <Navbar position="" />
      <Grid container className={classes.container}>

        <Grid container item md={8} style={{ minHeight: "70vh" }} className={classes.root}>
          {
            loading === true ?
              <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
                <ScaleLoader
                  css={override}
                  size={150}
                  color={"royalblue"}
                  // loading={loading}
                  height={60}
                  width={6}
                />
              </div>
              :
              <>
                {/* details */}

                <Grid
                  item
                  md={12}
                  style={{
                    height: "100px",
                    padding: "0 2em",
                    marginBottom: "1em",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className={classes.row}>
                    <span>Take Question</span>
                    <span>Analyse & research</span>
                    <span>Submit question</span>
                  </div>
                  <small style={{ fontFamily: "Roboto Slab", textAlign: "center" }}>
                    Expectation: 0% plagiarism, 0% grammer error
              <hr />
                  </small>
                </Grid>

                {/* requirements */}
                <Grid item md={11} className={classes.reqs}>
                  <h5>Requirements:</h5>
                  <div>
                    <small>Formatting:</small> {"   "}{requirements}
                  </div>
                </Grid><br />
                {/* Title */}
                <h4>{title}</h4>

                {/* subbar */}
                <Grid className={classes.subbar} item md={12}>
                  <div>
                    <Label />
                    {category}
                  </div>
                  <div>
                    <AccountBalanceWallet />
              ${parseInt(totalcost / 100)}
                  </div>
                  <div>
                    <Alarm />
                    {deadline}
                  </div>
                  <div>
                    <Event />
                    {moment(createdat && createdat.seconds && createdat.seconds * 1000).format('l')}
                  </div>

                  <Button variant="contained" color="primary">
                    Add Favourite
            </Button>
                </Grid>

                {/* Job section */}
                <Grid item md={12} className={classes.info}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Roboto Slab",
                    }}
                  >
                    <Avatar
                      style={{ height: "50px", width: "50px", marginRight: "1.5em" }}
                    >{title && title.charAt(0)}</Avatar>
                    {createdby}
                  </div>
                  <p style={{ overflowX: "hidden" }}>
                    {description}
                  </p>

                  {/* Attachmets: */}
                  <div style={{ margin: "0 5em" }}>
                    <strong style={{ fontFamily: "Roboto Slab" }}>
                      Job Attachments:
              </strong>

                    <div style={{ display: "flex" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                        {
                          values.attachments && values.attachments.map((doc, key) => {
                            if ((doc.downloadURL) && doc.tag.includes("image")) {
                              return (
                                <div style={{ display: "inline-block", padding: "0 1em" }} key={key} >
                                  <a href={`${doc.downloadURL}`} style={{ cursor: "pointer" }}  >
                                    <Paper style={{ width: "160px", height: "120px", background: "#fff", display: "flex" }}>
                                      {/* <span style={{ fontSize: "40px", fontWeight: "bold", margin: "auto   " }} >.docx</span> */}
                                      <img src={`${doc.downloadURL}`} alt="uploaded doc" />
                                    </Paper>
                                    <span style={{ color: "blue", fontStyle: "italic" }}>{`${doc.downloadURL && doc.downloadURL.substring(16, 42)}. . .`}</span>
                                  </a>
                                </div>
                              )
                            }
                            // doc.downloadURL &&
                            else if (doc.downloadURL && (doc.tag.includes("octet") || doc.tag.includes("word"))) {
                              return (
                                <div style={{ display: "inline-block", padding: "0 1em" }} key={key} >
                                  <a href={`${doc.downloadURL}`} style={{ cursor: "pointer" }}  >
                                    < Paper style={{ width: "160px", height: "130px", background: "#fff", display: "flex" }}>
                                      <AiOutlineFileWord style={{ margin: "auto", fontSize: "130px" }} />
                                    </ Paper>
                                    <span style={{ color: "blue", fontStyle: "italic" }}>{`${doc.downloadURL && doc.downloadURL.substring(16, 42)}. . .`}</span>
                                  </a>
                                </div>
                              )
                            } return ("")

                          })
                        }
                      </div>
                    </div>
                  </div>
                </Grid>

                {/* Footer */}
                <Grid item md={12} className={classes.footer}>
                  {

                    values.status && (values.status === "completed" || values.status === "complete") ?
                      <div style={{ backgroundColor: '#4BB543', width: "60%", margin: "auto", padding: ".5em 0", color: "#fff" }}>
                        <span >Job complete!</span>&nbsp;&nbsp;&nbsp;
                    </div>
                      :
                      <>
                        {
                          values.status && values.status === "submitted" ?
                            <div style={{ backgroundColor: '#4BB543', width: "60%", margin: "auto", padding: ".5em 0", color: "#fff" }}>
                              <span >Job Submitted Successfully!</span>&nbsp;&nbsp;&nbsp;<DoneAll style={{ fontSize: "35px" }} />
                            </div>
                            :
                            uploadDisplay && (values.status && values.status === "rejected") ? (
                              <>
                                <div style={{ backgroundColor: '#c13441', width: "60%", margin: "auto", padding: ".5em 0", color: "#fff" }}>
                                  <span >Job Rejected! Contact admin for more information</span>&nbsp;&nbsp;&nbsp;
                                </div>
                                <br />
                                <div>
                                  <p>
                                    Please Ensure your meet all requirements and expectations for
                                    error may lead to penalty
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      margin: "0 auto",
                                    }}
                                  >
                                    status
                                  <div
                                      style={{
                                        display: "grid",
                                        height: "200px",
                                        width: "500px",
                                        border: "1px dashed grey",
                                        placeItems: "center",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <Upload id={slug} updatedata={updatedata} setdata={setdata} displayProg={setDisplayProgress} setUploadProgress={setUploadProgress}>
                                        Select Task to Upload
                                  </Upload>
                                    </div>
                                  </div>
                                  {/* progress display */}
                                  {displayProgress ?
                                    <div className={classes.progress}>
                                      <LinearProgressWithLabel value={uploadProgress} />
                                    </div>
                                    :
                                    ""

                                  }

                                  <div>
                                    <Button onClick={jobSubmission} variant="contained" style={{ backgroundColor: "#4BB543", color: "#fff", padding: "8px 2em" }}>Submit JOB</Button>
                                  </div>
                                </div>
                              </>)
                              :
                              uploadDisplay ? (

                                <div>
                                  <p>
                                    Please Ensure your meet all requirements and expectations for
                                    error may lead to penalty
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      margin: "0 auto",
                                    }}
                                  >
                                    status
                              <div
                                      style={{
                                        display: "grid",
                                        height: "200px",
                                        width: "500px",
                                        border: "1px dashed grey",
                                        placeItems: "center",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <Upload id={slug} updatedata={updatedata} setdata={setdata} displayProg={setDisplayProgress} setUploadProgress={setUploadProgress}>
                                        Select Task to Upload
                              </Upload>
                                    </div>
                                  </div>
                                  {/* progress display */}
                                  {displayProgress ?
                                    <div className={classes.progress}>
                                      <LinearProgressWithLabel value={uploadProgress} />
                                    </div>
                                    :
                                    ""

                                  }

                                  <div>
                                    <Button onClick={jobSubmission} variant="contained" style={{ backgroundColor: "#4BB543", color: "#fff", padding: "8px 2em" }}>Submit JOB</Button>
                                  </div>
                                </div>
                              ) : (
                                title !== "" ?
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ height: "50px", width: "200px", margin: "0 auto" }}
                                    onClick={takeTask}
                                  >
                                    Take Task
                                  </Button>
                                  :
                                  <Button
                                    variant="contained"
                                    disabled
                                    style={{ height: "50px", width: "200px", margin: "0 auto" }}
                                    onClick={takeTask}
                                  >
                                    Take Task
                          </Button>
                              )}
                      </>
                  }
                </Grid>
              </>
          }
        </Grid>
      </Grid>
    </>
  );
};


const mapDispatchToProps = (dispatch) => {

  return {
    updateJob: (data) => dispatch(updateJob(data)),
    addJob: (id, jobId, job) => dispatch(addClientJob(id, jobId, job)),
    submitJob: (id, data, user) => dispatch(submitJob(id, data, user)),
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    user: state.firebase.auth,
    // jobs: state.firestore.ordered.jobs,
    clients: state.firestore.ordered.clients
  };
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => [
    {
      collection: "clients",
    }
  ])
)(Quiz);