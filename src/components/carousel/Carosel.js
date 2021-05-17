import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Button, withStyles } from "@material-ui/core";
import "./Carousel.css";
import useStyles from "../../styling/carosel.min.js"

import img_1 from "../../images/img_1.jpg";
import img_2 from "../../images/img_2.jpeg";
import img_3 from "../../images/img_3.jpg";
import img_4 from "../../images/img_4.jpg";

const Carosel = ({ classes }) => {
  return (
    <div id="home" styles={{ position: "relative" }}>
      <Carousel autoPlay infiniteLoop>
        <div className="image">
          <img src={img_1} alt="PMTutors" />
        </div>

        <div className="image">
          <img src={img_2} alt="PMTutors" />
        </div>

        <div className="image">
          <img src={img_3} alt="PMTutors" />
        </div>

        <div className="image">
          <img src={img_4} alt="PMTutors" />
        </div>
      </Carousel>

      <div className={classes.cover}>
        <h1 class="h1">ONLINE TUTORING</h1>

        <h4>Online 24/7 tutoring from skilled tutors </h4>

        <div className={classes.btns}>
          <Button
            onClick={() => (window.location.pathname = "signup")}
            className={classes.btn}
            variant="contained"
            color="primary"
          >
            I am a Tutor
          </Button>

          <Button className={classes.btn} variant="contained" color="secondary">
            I am a Student
          </Button>
        </div>

        <p style={{ fontSize: "19px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          voluptatibus esse sint tempora suscipit unde error, harum officiis
          quae consequatur!
        </p>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Carosel);