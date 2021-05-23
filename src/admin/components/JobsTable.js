import React, { useEffect, useState } from 'react'
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import ScaleLoader from "react-spinners/ScaleLoader";
import useStyles from "../css/job.min.js"
//   import { addJob, jobDelete, getJob, getJobs, updateJob } from "../data/JobData";

import moment from "moment";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createJob, removeJob, updateJob } from '../../store/actions/jobAction.js';
import fb from "../../config/fbConfig"

const JobsTable = (props) => {
    const classes = useStyles();
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    // loader css override
    const override = `
    display:flex;
    align-items:center;
    justify-content: center;
    border-color:red;
    `;

    useEffect(() => {
        const getJobs = async () => {
            setLoading(true)
            await fb.firestore().collection("jobs").orderBy("createdat", "desc")
                .onSnapshot(snaps => {
                    let data = []
                    snaps.forEach(item => data.push({ ...item.data(), id: item.id }))
                    setJobs(data)
                    console.log(data)
                    setLoading(false)
                })
            // .catch(err => { throw err })
        }

        getJobs()
    }, [])

    return (
        <>
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
                    {loading === true ? (
                        <TableRow>
                            <TableCell colSpan={7}>
                                <ScaleLoader
                                    css={override}
                                    size={150}
                                    loading={loading}
                                    color={"royalblue"}
                                />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {jobs &&
                                jobs.map((j, key) => (
                                    <TableRow key={j.id}>
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
                                        <TableCell>{moment(j.createdat && j.createdat.toDate()).calendar()}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => props.getOneJob(j.id)}
                                                color="primary"
                                                aria-label="Update Customer"
                                                disabled={j.status === "taken" ? false : j.status === "waiting" ? false : false}
                                            >
                                                <Edit />
                                            </IconButton>

                                            <IconButton
                                                onClick={() =>
                                                    window.confirm("Delete Job Item?") ? props.removeJob(j.id) : ""
                                                }
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
        </>
    )
}

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
)(JobsTable);
// export default

// export const getJobs = async () => {
//     let data = []
//     const list = await

// }