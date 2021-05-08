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
import React from "react";
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



const SubmittedVets = (props) => {
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
            <PageHeader
                title="Manage Client Vetting"
                subtitle="Create update, manage Test questions and approve submitted Tests."
                icon={<Work />}
                displayVetButtons={true}
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
                                Tests Submitted
                            </Typography>
                        </Grid>
                    </Grid>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.head}>Title</TableCell>
                                <TableCell className={classes.head}>username</TableCell>
                                <TableCell className={classes.head}>Submitted</TableCell>
                                <TableCell className={classes.head}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!props.tests ? (
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
                                    {props.tests &&
                                        props.tests.map((j, key) => (
                                            <TableRow key={key}>
                                                <TableCell>
                                                    {j.title.length > 52
                                                        ? `${j.title.substring(0, 49)} . . .`
                                                        : j.title}
                                                </TableCell>
                                                <TableCell>{j.uploadedby}</TableCell>
                                                <TableCell>{moment(j.uploadedat.toDate()).calendar()}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => window.location.pathname = `/pmtutorsadmin/vets/submitted/${j.id}`}
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

const mapStateToProps = (state) => {

    return {
        tests: state.firestore.ordered.submitted_vets
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        {
            collection: "submitted_vets",
            orderBy: ["uploadedat", "desc"],
        }
    ])
)(SubmittedVets);