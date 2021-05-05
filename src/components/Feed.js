import { Avatar, Grid } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import moment from "moment";
import React, {  useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import image from "../images/img_3.jpg";
import useStyles from '../styling/feed.min.js'
import ScaleLoader from "react-spinners/ScaleLoader"

const Feed = (props) => {
  const classes = useStyles();

  const [state, setState] = useState([]);
  
  // const getState = async () => {
  //   try {
  //     setState("")
  //   } catch (e) {
  //     NotificationManager.error(e.message);
  //     ;
  //   }
  // };

  const override = `
      display:flex;
      align-items:center;
      justify-content: center;
      border-color:red;
      `;


  return (
    <Grid
      container
      spacing={3}
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(190, 20, 93, 0.63)), url(${image}) `,
        backgroundRepeat:"no-repeat",
        backgroundSize: "cover",
        backgroundAttachment:"fixed",
        // backgroundPosition:"center",
        padding: ".1em 0",
        marginTop:".1em",
        
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
          minHeight:"92vh"

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
          {!props.tasks ?
            <div style={{width:"100%", height:"100%", display:"grid", placeItems:"center"}}>
                <ScaleLoader
                  css={override}
                  size={150}
                  color={"royalblue"}
                  loading={!props.tasks}
                  height={60}
                  width={6}
                />
            </div>
          :
          props.tasks &&
            props.tasks.map((j) =>
              j.status === "waiting" && (
                <div
                  className={classes.job}
                  key={j.id}
                  onClick={() =>
                    (window.location.pathname = `/quiz/${j.id}`)
                  }
                >
                  <Avatar style={{ color:'#fff', backgroundColor:"#3fcaaa", width: "60px", height: "60px" }}>
                    {j.title.charAt(0)}
                  </Avatar>
                  <div>
                    <h6 style={{}}>
                      {j.title.length > 25
                        ? `${j.title.substring(0, 30)} . . .`
                        : j.title}
                    </h6>

                    <p style={{color:"#3f4aca"}}>
                      Posted:{" "}
                      {moment(
                        j.createdat.toDate()
                      ).fromNow()}{" "}
                      <span style={{ color: "grey", fontsize: "12px" }}>
                        by {j.createdby}
                      </span>
                    </p>
                  </div>

                  <Favorite style={{color:"#3f4aca"}} />
                  <p style={{color:"#656565"}}>
                    {j.description.length > 30
                      ? `${j.description.substring(0, 52)} . . .`
                      : j.description}
                  </p>
                </div>
              )
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) =>{
  console.log(state)
  return {
    tasks: state.firestore.ordered.jobs
  }
}

export default compose( 
  connect(mapStateToProps,null),
 
  firestoreConnect(() =>[
    {
      collection:"jobs",
      where: ["status", "==", "waiting"],
      orderBy:["createdat","desc"],
    }
  ])
)(Feed)