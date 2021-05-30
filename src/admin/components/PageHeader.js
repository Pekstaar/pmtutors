import { Button, Card, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from '../css/pageheader.min.js';

const PageHeader = (props) => {
  const { title, subtitle, icon } = props

  const classes = useStyles();

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>

        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>

          <Typography variant="subtitle2" component="div">
            {subtitle}
          </Typography>
        </div>
      </div>
      {props.displayButtons ?
        <div>
          <Link style={{ textDecoration: "none" }} to="/pmtutorsadmin/jobs"><Button style={{ height: "50px" }} variant="contained" color="secondary" >Manage Jobs</Button></Link>
          <Link style={{ textDecoration: "none" }} to="/pmtutorsadmin/jobs/submitted"><Button style={{ height: "50px" }} variant="contained" color="primary">Submitted Jobs</Button></Link>
        </div>
        :
        ""
      }
      {props.displayVetButtons ?
        <div>
          <Link style={{ textDecoration: "none" }} to="/pmtutorsadmin/vets"><Button style={{ height: "50px" }} variant="contained" color="secondary" >Manage Test questions</Button></Link>
          <Link style={{ textDecoration: "none" }} to="/pmtutorsadmin/vets/submitted"><Button style={{ height: "50px" }} variant="contained" color="primary">Submitted Tests</Button></Link>
        </div>
        :
        ""
      }
    </Paper>
  );
};

export default PageHeader;