import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { AddCircle, Delete, Edit, Work } from "@material-ui/icons";
import React, { useState } from "react";
import PageHeader from "./PageHeader";
import ScaleLoader from "react-spinners/ScaleLoader";
//   import { addJob, jobDelete, getJob, getJobs, updateJob } from "../data/JobData";
import JobsDialog from "./JobsDialog";
import useStyles from "../css/job.min.js"
import { createJob, removeJob, updateJob } from "../../store/actions/jobAction"
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";



const Job = (props) => {
  // file styling
  const classes = useStyles();

  // file states
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [jobId, setJobId] = useState('')
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


  // loader css override
  const override = `
      display:flex;
      align-items:center;
      justify-content: center;
      border-color:red;
      `;


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
      props.createJob(state)

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
        displayButtons={true}
      />

      <Container className={classes.root}>
        <TableContainer component={Paper}>
          <Grid container>
            <Grid item xs={8}>
              <Typography
                className={classes.title}
                variant="h6"
                component="div"
              >
                All Jobs
                </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                // classes={classes.button}
                startIcon={<AddCircle />}
                style={{ margin: "10px 8px", float: "right" }}
              >
                Add
                </Button>
            </Grid>
          </Grid>

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>Title</TableCell>
                <TableCell className={classes.head}>Cost(kshs)</TableCell>
                <TableCell className={classes.head}>Category</TableCell>
                <TableCell className={classes.head}>Posted By</TableCell>
                <TableCell className={classes.head}>Status</TableCell>
                <TableCell className={classes.head}>Taken By</TableCell>

                {/* <TableCell className={classes.head}>Timestamp</TableCell> */}
                <TableCell className={classes.head}>created</TableCell>
                <TableCell className={classes.head}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!props.jobs ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <ScaleLoader
                      css={override}
                      size={150}
                      color={"royalblue"}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {props.jobs &&
                    props.jobs.map((j, key) => (
                      <TableRow key={key}>
                        <TableCell>
                          {j.title.length > 22
                            ? `${j.title.substring(0, 19)} . . .`
                            : j.title}
                        </TableCell>
                        <TableCell>{j.totalcost} kshs</TableCell>
                        <TableCell>{j.category}</TableCell>
                        <TableCell>{j.createdby}</TableCell>
                        <TableCell>{j.status}</TableCell>
                        <TableCell>{j.takenby}</TableCell>
                        {/* <TableCell>
                            {ManageJTime(j.timestamp, "date")}
                          </TableCell> */}
                        <TableCell>{moment(j.createdat.toDate()).calendar()}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => getOneJob(j.id)}
                            color="primary"
                            aria-label="Update Customer"
                          >
                            <Edit />
                          </IconButton>

                          <IconButton
                            onClick={() => props.removeJob(j.id)}
                            color="secondary"
                            aria-label="Update Customer"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <JobsDialog
          open={open}
          close={handleClose}
          setOpen={setOpen}
          formmode={formMode}
          jobDetails={state}
          handleChange={handleChange}
          addJob={addJobHandler}
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