import { Grid } from "@material-ui/core";
import { EventAvailable } from "@material-ui/icons";
import React from "react";

import { GiArchiveResearch } from "react-icons/gi";
import { RiTimerFlashFill } from "react-icons/ri";
import useStyles from "../styling/ouroffers.min.js"

const OurOffers = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.container}>
      <h4
        style={{ fontFamily: "Roboto Slab", borderBottom: "2px solid #d95959" }}
      >
        OUR OFFERS
      </h4>
      <Grid
        container
        item
        sm={9}
        xs={12}
        style={{ padding: "4em 5rem" }}
        className={classes.root}
      >
        <Grid className={classes.item} item sm={4}>
          <GiArchiveResearch className={classes.icon} />
          {/* What we offer title */}
          <h6>Plenty Research</h6>
          {/* what we offer explanation */}
          <p>We broadly explore on your task</p>
        </Grid>
        <Grid className={classes.item} item sm={4}>
          <RiTimerFlashFill className={classes.icon} />

          <h6>Handing on Time!</h6>

          <p>Task is Completed and Handed on time</p>
        </Grid>
        <Grid className={classes.item} item sm={4}>
          <EventAvailable className={classes.icon} />

          <h6>24/7 workout</h6>

          <p>Readily available at your service</p>
        </Grid>
        <span className={classes.slanted}>
          We offer fair rates and quality freelance work
        </span>
        <span className={classes.normal}>Earn Up to $10 per page</span>
      </Grid>
    </Grid>
  );
};

export default OurOffers;