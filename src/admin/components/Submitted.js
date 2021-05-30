import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
//   import { addJob, jobDelete, getJob, getJobs, updateJob } from "../data/JobData";
import useStyles from "../css/job.min.js"
// import { createJob, removeJob, updateJob } from "../../store/actions/jobAction"
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { Link } from "react-router-dom";
// import fb from "../../config/fbConfig"
// import { NotificationManager } from "react-notifications";



const Submitted = (props) => {
    // file styling
    const classes = useStyles();



    // const  slug = props.match.params;

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
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head}>Title</TableCell>
                        <TableCell className={classes.head}>Category</TableCell>
                        <TableCell className={classes.head}>Cost(kshs)</TableCell>
                        <TableCell className={classes.head}>Submitted By</TableCell>
                        <TableCell className={classes.head}>Submitted</TableCell>
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
                        props.jobs &&
                        props.jobs.map((j, key) => (
                            <TableRow key={key}>
                                <TableCell>
                                    {j.jobtitle.length > 22
                                        ? `${j.jobtitle.substring(0, 19)} . . .`
                                        : j.jobtitle}
                                </TableCell>
                                <TableCell>{j.category}</TableCell>
                                <TableCell>{j.totalcost} kshs</TableCell>
                                <TableCell>{j.submittedby}</TableCell>
                                <TableCell>{moment(j.submittedat.toDate()).calendar()}</TableCell>
                                <TableCell>
                                    <Link to={`/pmtutorsadmin/jobs/submitted/${j.id}`}>
                                        <IconButton
                                            color="primary"
                                            aria-label="View Job"
                                        >
                                            <Visibility />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div >
    );
};

const mapStateToProps = (state) => {

    return {
        jobs: state.firestore.ordered.submitted
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        {
            collection: "submitted",
            orderBy: ["submittedat", "desc"],
        }
    ])
)(Submitted);