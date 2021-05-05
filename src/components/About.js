import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import useStyles from "../styling/about.min.js"

const About = () => {
  // Styling
  const classes = useStyles();
  return (
    <div id="about" className={classes.container}>
      <h1
        style={{
          fontFamily: "Roboto Slab",
          textAlign: "center",
          marginTop: "-6em",
        }}
      >
        Advancing Career at <br /> <span>PMTutors</span>
      </h1>
      <Grid
        item
        xs={12}
        style={{ padding: "1em 5rem" }}
        className={classes.root}
      >
        <Grid className={classes.stage} item sm={11}>
          <Avatar
            className={classes.large}
            alt="Remy Sharp"
            src="https://files.realpython.com/media/python-beginner-tips.50f5f0c4e739.jpg"
          />
          <div>
            <h5>Beginner</h5>
            <p>Pick 2 tasks only at a go</p>
          </div>
        </Grid>
        <Grid className={classes.stage} item sm={11}>
          <Avatar
            className={classes.large}
            alt="Remy Sharp"
            src="https://alfacat.eu/wp-content/uploads/2020/05/launching.svg"
          />
          <div>
            <h5>Intermediate</h5>
            <p>Pick 4 tasks at a go</p>
          </div>
        </Grid>
        <Grid className={classes.stage} item sm={11}>
          <Avatar
            className={classes.large}
            alt="Remy Sharp"
            src="https://www.athcodigital.com/static/rocket30-4cc012089249d4f57ac51ec1f90a8d1a.svg"
          />
          <div>
            <h5>Advanced</h5>
            <p>Pick 6 tasks or more at a go based on your perfection</p>
          </div>
        </Grid>
      </Grid>

      <h4>ABOUT US</h4>
      <br />
      <Grid container className={classes.root}>
        <Grid
          item
          sm={6}
          xs={12}
          style={{
            padding: "1em 0",
            display: "grid",
            justifyContent: "flex-end",
            float: "right",
          }}
          // className={classes.img}
        >
          <img
            src="https://www.kindpng.com/picc/m/49-497739_computer-clipart-team-development-team-png-transparent-png.png"
            width="550px"
            alt=""
          />
        </Grid>

        <Grid
          item
          sm={6}
          xs={12}
          style={{
            padding: "1em 0",

            display: "flex",
            flexDirection: "column",
            placeItems: "center",
          }}
          className=""
        >
          <Grid
            item
            xs={6}
            style={{
              padding: "1em .8em",
              marginTop: "1em",
              placeSelf: "flex-start",
              fontSize: "18px",
              color: "white",
            }}
            className=""
          >
            <p>
              We are a reliable partner you can trust. We employ hundreds of
              writers and editors and guarantee high salaries and stable
              bi-weekly payouts to our freelancers. Our cornerstone principle is
              simple: fair price for fair work. Our rates are above average for
              the industry and we make sure that your work is fairly
              compensated.
            </p>
          </Grid>
        </Grid>
      </Grid>

      <h4>Reviews</h4>
      <Grid
        item
        sm={6}
        xs={12}
        style={{
          // padding: "1em .8em",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "130px 1fr",
          margin: "0 auto ",
          marginBottom: "2em",
          fontSize: "18px",
          color: "white",
          spacing: "1em",
        }}
        className=""
      >
        <div>
          <Avatar
            className={classes.large}
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          />
          Steve Job
        </div>

        <p style={{ fontStyle: "italic" }}>
          <span className={classes.q}>"</span>
          I've been with PMTutors for some time now and can say that this is the
          best experience that I ever had with these freelance Jobs.
          <span className={classes.q}>"</span>
        </p>
      </Grid>
    </div>
  );
};


export default About;