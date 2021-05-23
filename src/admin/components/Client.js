import {
    Container,
    Grid,
    Paper,
    TableContainer,
} from "@material-ui/core";
import { Work } from "@material-ui/icons";
import React from "react";
import PageHeader from "./PageHeader";
//   import { addJob, jobDelete, getJob, getJobs, updateJob } from "../data/JobData";
import useStyles from "../css/job.min.js"
// import { createJob, removeJob, updateJob } from "../../store/actions/jobAction"
import NavTabs from "./switchTab";



const Client = (props) => {
    // loader css override

    const classes = useStyles();



    return (
        <div>
            <PageHeader
                title="New Job"
                subtitle="Create update and manage Jobs available for clients."
                icon={<Work />}
            />

            <Container className={classes.root}>
                <TableContainer component={Paper}>
                    <Grid container>
                        <Grid item xs={12}>
                            <NavTabs page="clients" />
                        </Grid>
                    </Grid>


                </TableContainer>

            </Container>
        </div>
    );
};

export default (Client);



