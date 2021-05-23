import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import fb from "../config/fbConfig"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

  const { firebase } = useSelector(state => ({ ...state }))

  const auth = firebase.auth
  const [level, setLevel] = useState()

  useEffect(() => {
    const getLevel = () => {
      // setIsLoading(true)
      fb.firestore().collection("clients").doc(firebase.auth.uid).get()
        .then(r => {
          if (r && r.data() && r.data().level) {
            // console.log(r.data().level)
            setLevel(r.data().level);
            // setIsLoading(false)
          }
          return
        })
    }

    getLevel()
  }, [firebase.auth.uid])


  return (
    <Route
      {...rest}
      render={(routeProps) =>
        auth && auth.uid ? (

          level === "to_vet" ?
            <Redirect to={"/vetting"} />
            :
            <RouteComponent {...routeProps} />

        ) : (
          <Redirect to={"/Login"} />
        )
      }
    />
  );
};

export default PrivateRoute;