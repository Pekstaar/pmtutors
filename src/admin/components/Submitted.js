import {
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
import { Visibility, Work } from "@material-ui/icons";
import React, { useState } from "react";
import PageHeader from "./PageHeader";
import ScaleLoader from "react-spinners/ScaleLoader";
//   import { addJob, jobDelete, getJob, getJobs, updateJob } from "../data/JobData";
import useStyles from "../css/job.min.js"
// import { createJob, removeJob, updateJob } from "../../store/actions/jobAction"
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
// import fb from "../../config/fbConfig"
// import { NotificationManager } from "react-notifications";



const Submitted = (props) => {
    // file styling
    const classes = useStyles();

    // file states
    // initial details = empty default
    // const [state, setState] = useState({

    // });


    // loader css override
    const override = `
      display:flex;
      align-items:center;
      justify-content: center;
      border-color:red;
      `;

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
                                style={{ fontFamily: "Roboto Slab" }}
                            >
                                Submitted Jobs
                            </Typography>
                        </Grid>
                    </Grid>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.head}>Title</TableCell>
                                <TableCell className={classes.head}>Category</TableCell>
                                <TableCell className={classes.head}>Cost(kshs)</TableCell>
                                <TableCell className={classes.head}>Taken By</TableCell>
                                <TableCell className={classes.head}>Submitted</TableCell>
                                <TableCell className={classes.head}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!props.clients ? (
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
                                                <TableCell>{j.category}</TableCell>
                                                <TableCell>{j.totalcost} kshs</TableCell>
                                                <TableCell>{j.takenby}</TableCell>
                                                <TableCell>{moment(j.submittedat.toDate()).calendar()}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        // onClick={() => getOneJob(j.id)}
                                                        color="primary"
                                                        aria-label="View Job"
                                                    >
                                                        <Visibility />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const mapStateToProps = (state) => {

    return {
        jobs: state.firestore.ordered.submitted
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: "submitted",
            orderBy: ["submittedat", "desc"],
        }
    ])
)(Submitted);