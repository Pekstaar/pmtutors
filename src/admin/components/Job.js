import {
  Container,
  Grid,
  IconButton,
  Paper,
  TableContainer,
} from "@material-ui/core";
import { AddCircle, Work } from "@material-ui/icons";
import React, { useState } from "react";
import PageHeader from "./PageHeader";
//   import { addJob, jobDelete, getJob, getJobs, updateJob } from "../data/JobData";
import JobsDialog from "./JobsDialog";
import useStyles from "../css/job.min.js"
import { createJob, removeJob, updateJob } from "../../store/actions/jobAction"
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import NavTabs from "./switchTab";
import fb from "../../config/fbConfig"
import { NotificationManager } from "react-notifications";



const Job = (props) => {
  // file styling
  const classes = useStyles();

  // file states
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [jobId, setJobId] = useState('')
  // const [attachments, setAttachments] = useState({})
  // initial details = empty default
  const [state, setState] = useState({
    title: "",
    totalcost: "",
    description: "",
    requirements: "",
    createdby: "",
    status: "",
    takenby: "",
    deadline: "",
    pagecost: "",
    category: "",
  });


  // internal Functions
  // make all fields empty
  const makeEmpty = () => {
    setState({
      ...state,
      title: "",
      pagecost: "",
      description: "",
      requirements: "",
      createdby: "",
      status: "",
      takenby: "",
      deadline: "",
      totalcost: "",
      category: "",
      attachments: ""
    });
  };

  // handle dialog fields change
  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;

    setState({
      ...state,

      [name]: value,
    });
  };

  // handle form close
  const handleClose = () => {
    setOpen(false);
  };

  // handle add button click
  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
    makeEmpty();
  };

  //get one job details
  const getOneJob = (id) => {
    setFormMode(false);
    // console.log(state)
    setJobId(id);
    const currentJob = props && props.jobs.find(e => e.id === id)
    // console.log(response);

    setState({
      ...currentJob,
    })

    // console.log(jobDetails);
    setOpen(true);

  };


  const addJobHandler = (e) => {
    e.preventDefault();

    if (formMode) {
      CreateJob(state)

      setOpen(false);
      makeEmpty();
    } else {
      // then update job
      props.updateJob(jobId, state)


      // getAllJobs();
      setOpen(false);
      makeEmpty();
    }
  };

  return (
    <div>
      <PageHeader
        title="Manage Jobs"
        subtitle="Create update, manage Jobs available and approve submitted Jobs."
        icon={<Work />}
        // displayButtons={true}
        createJob={createJob}
      />

      <Container style={{ position: 'relative' }} className={classes.root}>
        <TableContainer component={Paper}>
          <Grid container >

            <IconButton
              onClick={handleAdd}
              color="primary"
              aria-label="View Job"
              style={{ float: "right", position: "absolute", right: "0", top: "-3.3em" }}
            >
              <span style={{ fontSize: "16px", fontFamily: "Roboto Slab" }}></span>
              <AddCircle style={{ fontSize: "45px" }} />
            </IconButton>
            <Grid item xs={12}>
              <NavTabs getOneJob={getOneJob} prop={props} page="jobs" />
            </Grid>
          </Grid>

          {/*  */}
          {/* <Submitted /> */}
        </TableContainer>

        <JobsDialog
          open={open}
          close={handleClose}
          setOpen={setOpen}
          formmode={formMode}
          jobDetails={state}
          handleChange={handleChange}
          addJob={addJobHandler}
          setAttachments={setState}
          atts={state.attachments}
          state={state}
          id={jobId}
        />
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createJob: (job) => dispatch(createJob(job)),
    removeJob: (id) => dispatch(removeJob(id)),
    updateJob: (id, data) => dispatch(updateJob(id, data))
  }
}

const mapStateToProps = (state) => {

  return {
    jobs: state.firestore.ordered.jobs
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => [
    {
      collection: "jobs",
      orderBy: ["createdat", "desc"],
    }
  ])
)(Job);


export const CreateJob = async (data) => {
  const res = await fb.firestore().collection("jobs").add({ ...data, createdat: new Date() })

  if (res.id) {
    console.log("Job Created", res.id)
  }
}