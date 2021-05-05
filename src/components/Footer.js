import { Grid } from "@material-ui/core";
import React from "react";
import useStyles from "../styling/footer.min.js";

const Footer = () => {
  // Styling:
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={5} xs={12} id="contact" className={classes.div}>
        <h5
          style={{
            fontFamily: "Roboto Slab",
            fontSize: "23px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#f50057" }}>PM</span>&nbsp;TutorsHUB
        </h5>

        <span style={{ opacity: "0.8" }}>FEEL FREE TO CONTACT US AT:</span>
        <span>+254 721 889366</span>
        <span>+254 729 138466</span>
        <strong style={{ color: "#fdfdfd" }}>pmtutorshub@gmail.com</strong>
      </Grid>
      <Grid
        item
        sm={5}
        xs={12}
        className={classes.div}
        style={{ placeSelf: "flex-start" }}
      >
        <ul className={classes.nav}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact Us</a>
          <a href="login">Login</a>
          <a href="signup">Sign Up</a>
        </ul>
      </Grid>

      <p
        style={{
          fontSize: "15px",
          opacity: "0.6",
          placeSelf: "flex-end",
          marginTop: "1em",
        }}
      >
        <span style={{ fontSize: "16px" }}>&copy; </span>
        {new Date().getFullYear()} PMTutors.com All rights Reserved
      </p>

      <span id="design" style={{ color: "#ffffff20" }}>
        Designed by Pekstar Coders
      </span>
    </Grid>
  );
};

export default Footer;