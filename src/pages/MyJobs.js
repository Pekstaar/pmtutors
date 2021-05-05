import { Avatar, Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { Check, Clear, MoreHoriz, Star } from "@material-ui/icons";
import React from "react";
import Navbar from "../components/navigation/Navbar";
import useStyles from "../styling/myjobs.min.js"
import fb from "../config/fbConfig"
import {useState, useEffect, useSelector} from "react"
import { connect } from "react-redux";
import image from "../images/empty.png"
import moment from "moment";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

// import { Link } from "react-router-dom";

const MyJobs = (props) => {
  // styling:
  const classes = useStyles();

  // const {firebase} = useSelector((state) => ({...state}))

  const [state,setState] = useState([])

  // context
  const getJobs =async() =>{
    const events = await fb.firestore().collection('clients').doc(props.user.uid).collection("jobs")
    
    events.get().then((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
          return {...doc.data() }
        })
        setState(tempDoc)
      })
}

  useEffect(() => {
    getJobs()
  }, []);

  

  return (
    <>
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
            borderRadius:".4em",
            height: "100vh",
          }}
        >
          {/* task history */}
          <Grid item md={12} style={{padding:"0"}}>
            <Paper className={classes.task}>
                <label className="title">
                    <span>Your Jobs</span>

                    <span style={{color:"gray"}}>{moment(new Date()).format("MMM Do YY")}</span>
                </label>

                {state.length !== 0 ? state.map((j,key) => 
                   
                      <div key={key} onClick={() => props.history.push(`/quiz/${j.id}`)}>
                        <h6 style={{ margin: "0" }}>
                          {j.title}
                        </h6>
        
                        <span style={{ color: "rgba(0,0,0,0.5)" }}>{moment(j.createdat.toDate()).format('L')}</span>
                        {/* `${classes}${j.my_status}` */}
                             <div style={{color:"royalblue"}} >
                               <span style={{ display: "flex", alignItems: "center" }}>
                                {/* <Check style={{ fontSize: "30px" }} /> */}
                                 <small>{j.my_status}</small>
                               </span>
                             </div>
                            
                        
                      </div>
                  ):
                  <img src={image} alt="empty List" height="300px" width="400px"/>
                  }
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) =>{
  console.log(state)
  return {
    user: state.firebase.auth,
    clien: state.firestore.data.clients
  }
}

export default compose( 
    connect(mapStateToProps,null),
   
    firestoreConnect((props) =>[
      {
        collection:"clients",
        orderBy:["createdat","desc"]
      }
    ])
  )(MyJobs)