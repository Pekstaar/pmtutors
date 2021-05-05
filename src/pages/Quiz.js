
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
import { updateJob } from "../store/actions/jobAction";
import { connect } from "react-redux";
import { addClientJob } from "../store/actions/clientAction";
import Upload from "../components/uploader";
import LinearProgressWithLabel from "../components/progress"
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
  const getDetails = () => {
    fb.firestore().collection("jobs").doc(slug).get()
      .then(doc => {

        // console.log(values);
        setValues({
          title: doc.data().title,
          description: doc.data().description,
          requirements: doc.data().requirements,
          createdby: doc.data().createdby,
          createdat: doc.data().createdat,
          totalcost: doc.data().totalcost,
          pagecost: doc.data().pagecost,
          deadline: doc.data().deadline,
          category: doc.data().category,
          postedby: doc.data().postedby,
          status: doc.data().status
        });

        if (doc.data().status === "taken") {
          setUploadDisplay(true)
        }

      })
      .catch(e => NotificationManager.error(e.message))
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


  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar position="" />
      <Grid container className={classes.container}>
        <Grid container item md={8} className={classes.root}>
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
          <Grid item md={10} className={classes.reqs}>
            <h5>Requirements:</h5>
            <div>
              <small>Formatting:</small> {"   "}{requirements}
            </div>
          </Grid>
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
                data:
              </strong>
              <div style={{ display: "flex" }}>
                <Paper
                  style={{ width: "150px", height: "150px", margin: "0 .2em" }}
                >
                  <AiOutlineFileWord style={{ fontSize: "130px" }} />
                </Paper>
                <Paper
                  style={{ width: "150px", height: "150px", margin: "0 .2em" }}
                >
                  <AiOutlineFileWord style={{ fontSize: "130px" }} />
                </Paper>
              </div>
            </div>
          </Grid>

          {/* Footer */}
          <Grid item md={12} className={classes.footer}>
            {uploadDisplay ? (
              <>
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
              </>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};


const mapDispatchToProps = (dispatch) => {

  return {
    updateJob: (data) => dispatch(updateJob(data)),
    addJob: (id, jobId, job) => dispatch(addClientJob(id, jobId, job))
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.firebase.auth,
    jobs: state.firestore.ordered.jobs
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);