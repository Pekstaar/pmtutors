import { Button, Grid } from "@material-ui/core";
import { BsPersonPlus } from "react-icons/bs";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { GiBookmarklet } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";
import React from "react";
import useStyles from "../styling/application.min.js"

const Application = () => {
  // styling
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
        sm={9}
        xs={12}
        style={{ padding: "1em 5rem", marginTop: "1em" }}
        className={classes.root}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Application Process</h2>
          <br />
          <h5>Want To Earn?</h5>
        </div>

        <Grid item container xs={12}>
          <Grid className={classes.step} item sm={3} xs={8}>
            {/* icon Section */}
            <div className={classes.icon}>
              <BsPersonPlus />
            </div>
            {/* step section */}
            <span>1.Register to Join</span>
          </Grid>
          <Grid className={classes.step} item sm={3} xs={8}>
            {/* icon Section */}
            <div className={classes.icon}>
              <HiOutlineClipboardCopy />
            </div>
            {/* step section */}
            <span>2.Take Test</span>
          </Grid>
          <Grid className={classes.step} item sm={3} xs={8}>
            {/* icon Section */}
            <div className={classes.icon}>
              <GrDocumentConfig />
            </div>
            {/* step section */}
            <span>3.Set up Profile</span>
          </Grid>
          <Grid className={classes.step} item sm={3} xs={8}>
            {/* icon Section */}
            <div className={classes.icon}>
              <GiBookmarklet />
            </div>
            {/* step section */}
            <span>4.Take Task</span>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          //   color="secondary"
          onClick={() => (window.location.pathname = "signup")}
          style={{
            backgroundColor: "#d95959",
            alignSelf: "center",
            padding: ".7em 3em",
            fontSize: "16px",
            color: "white",
          }}
        >
          Join Now
        </Button>
        <br />
      </Grid>
    </Grid>
  );
};

export default Application;