import { Avatar, Grid } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "../config/fbConfig"
import { handleLevelTasks } from "../functions/handleLevel"

import image from "../images/img_3.jpg";
import useStyles from '../styling/feed.min.js'
import ScaleLoader from "react-spinners/ScaleLoader"

const Feed = (props) => {
  const classes = useStyles();

  const [isToTake, setIsToTake] = useState()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)


  const override = `
      display:flex;
      align-items:center;
      justify-content: center;props
      border-color:red;
      `;

  const openJob = async (j) => {
    // console.log(j)
    // (history.push = `/quiz/${j.id}`)
    const client = await firebase.firestore().collection("clients")
      .doc(props.user.uid)
      .get()


    if (client.data().status && client.data().status === "disabled") {
      window.alert("Your account is disabled, Please contact admin for more info")
      return
    }
    if (isToTake <= 0) {
      window.alert("You are not allowed to take more jobs based on your Level. Complete atleast on more task in your cart so as to take another")
      return;
    }
    console.log(client.data().status)
    // if (isToTake >= 1) {
    //   window.location.pathname = `/quiz/${j.id}`
    //   return;
    // }
  }

  useEffect(() => {
    const getData = async () => {

      const level = await firebase.firestore().collection("clients")
        .doc(props.user.uid)
        .get()

      let data = [];
      firebase.firestore().collection("clients").doc(props.user.uid)
        .collection("jobs")
        .where("status", "!=", "completed")
        .get()
        .then(r => r.forEach(doc => data.push(doc.data())))
        .then(() => {
          console.log(data.length)
          setIsToTake(handleLevelTasks(level.data() && level.data().level) - data.length)
        })
      // const filtered = data.data().filter(e => e.status === "taken")


    }

    const getJobs = async () => {
      setLoading(true)
      await firebase.firestore().collection("jobs")
        .orderBy("createdat", "desc")
        .where("status", "==", "waiting")
        .onSnapshot(snaps => {
          let data = [];
          snaps.forEach(item => data.push({ ...item.data(), id: item.id }))
          console.log(data)
          setJobs([...data])
          setLoading(false)
        })
    }

    getJobs()
    getData()
  }, [props.user.uid])

  return (
    <Grid
      container
      spacing={3}
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(190, 20, 93, 0.63)), url(${image}) `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        // backgroundPosition:"center",
        padding: ".1em 0",
        marginTop: ".1em",

      }}
    >
      <Grid
        item
        sm={9}
        xs={12}
        style={{
          display: "flex",
          flexDirection: "column ",
          padding: "1em ",
          backgroundColor: "whitesmoke",
          minHeight: "92vh"

          // padding: "1.2em 0",
        }}
      >
        <h5
          style={{
            fontFamily: "Roboto Slab",
            textTransform: "capitalize",
            color: "rgba(0,0,0,0.8)",
            margin: ".5em 4em",
            fontSize: "18px",
            borderBottom: "1px solid gray",
          }}
        >
          Jobs available
        </h5>
        <Grid item sm={12} justifycontent="center">
          {loading === true ?
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
              <ScaleLoader
                css={override}
                size={150}
                color={"royalblue"}
                loading={loading}
                height={60}
                width={6}
              />
            </div>
            :
            jobs &&
            jobs.map((j) =>
              // j.status === "waiting" && (
              <div
                className={classes.job}
                key={j.id}
                onClick={() => openJob(j)}
              >
                <Avatar style={{ color: '#fff', backgroundColor: "#3fcaaa", width: "60px", height: "60px" }}>
                  {j.title.trim().charAt(0)}
                </Avatar>
                <div>
                  <h6 style={{}}>
                    {j.title.length > 25
                      ? `${j.title.substring(0, 30)} . . .`
                      : j.title}
                  </h6>

                  <p style={{ color: "#3f4aca" }}>
                    Posted:{" "}
                    {moment(
                      j.createdat.toDate()
                    ).fromNow()}{" "}
                    <span style={{ color: "grey", fontsize: "12px" }}>
                      by {j.createdby}
                    </span>
                  </p>
                </div>

                <Favorite style={{ color: "#3f4aca" }} />
                <p style={{ color: "#656565" }}>
                  {j.description.length > 30
                    ? `${j.description.substring(0, 52)} . . .`
                    : j.description}
                </p>
              </div>
              // )
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    tasks: state.firestore.ordered.jobs,
    user: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, null),

  firestoreConnect(() => [
    {
      collection: "jobs",
      // where: ["status", "==", "waiting"],
      orderBy: ["createdat", "desc"],
    }
  ])
)(Feed)