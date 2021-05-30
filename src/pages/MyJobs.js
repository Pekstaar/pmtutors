import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Navbar from "../components/navigation/Navbar";
import useStyles from "../styling/myjobs.min.js"
import fb from "../config/fbConfig"
import { useState, useEffect } from "react"
import { connect } from "react-redux";
import image from "../images/empty.png"
import moment from "moment";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

const MyJobs = (props) => {
  // styling:
  const classes = useStyles();

  // const {firebase} = useSelector((state) => ({...state}))

  const [state, setState] = useState([])

  const handleClassName = (name) => {
    if (name === "completed" || name === "complete") {
      return "alert alert-success"
    } else if (name === "pending") {
      return "alert alert-warning"
    } else if (name === "rejected") {
      return "alert alert-danger"
    } else {
      return "alert alert-info"
    }
  }

  // context
  const getJobs = async () => {
    const events = await fb.firestore().collection('clients').doc(props.user.uid).collection("jobs").orderBy("createdat", "desc")

    events.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      setState(tempDoc)
    })
  }

  useEffect(() => {
    getJobs()
  });



  return (
    <div>
      <Navbar />
      <Grid container className={classes.container}>
        <Grid
          container
          item
          md={8}
          style={{
            backgroundColor: "#fdfdfde9",
            padding: "1em 2em ",
            margin: ".1em 0",
            borderRadius: ".4em",
            height: "100vh",
          }}
        >
          {/* task history */}
          <Grid item md={12} style={{ padding: "0" }}>
            <Paper className={classes.task}>
              <label className="title">
                <span>Your Jobs</span>

                <span style={{ color: "gray" }}>{moment(new Date()).format("MMM Do YY")}</span>
              </label>

              {state.length !== 0 ? state.map((j, key) =>
                <Link key={key} to={`/quiz/${j.id}`}>
                  <div className={`${handleClassName(j.my_status)}`} style={{ minWidth: "720px" }}>
                    <h6 style={{ margin: "0" }}>
                      {j.title.length >= 40 ? j.title.substring(0,) : j.title}
                    </h6>

                    <span style={{ color: "rgba(0,0,0,0.5)" }}>{moment(j.createdat.toDate()).format('L')}</span>
                    {/* `${classes}${j.my_status}` */}
                    <div style={{ color: "auto" }} >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        {/* <Check style={{ fontSize: "30px" }} /> */}
                        <small>{j.my_status}</small>
                      </span>
                    </div>
                  </div>
                </Link>
              ) :
                <img src={image} alt="empty List" height="300px" width="400px" />
              }
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.firebase.auth,
    clien: state.firestore.data.clients
  }
}

export default compose(
  connect(mapStateToProps, null),

  firestoreConnect((props) => [
    {
      collection: "clients",
      orderBy: ["createdat", "desc"]
    }
  ])
)(MyJobs)