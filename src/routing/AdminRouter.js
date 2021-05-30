import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
// import fb from "../config/fbConfig"

const AdminRoute = ({ component: RouteComponent, ...rest }) => {

    const { firebase } = useSelector(state => ({ ...state }))

    const auth = firebase.auth
    // const [level, setLevel] = useState()

    // useEffect(() => {
    //     const getLevel = () => {
    //         // setIsLoading(true)
    //         fb.firestore().collection("clients").doc(firebase.auth.uid).get()
    //             .then(r => {
    //                 if (r && r.data() && r.data().level) {
    //                     // console.log(r.data().level)
    //                     setLevel(r.data().level);
    //                     // setIsLoading(false)
    //                 }
    //                 return
    //             })
    //     }

    // getLevel()
    // }, [])


    return (
        <Route
            {...rest}
            render={(routeProps) =>
                auth && auth.uid ? (
                    <RouteComponent {...routeProps} />

                ) : (
                    <Redirect to={"/pmtutorsadmin/login"} />
                )
            }
        />
    );
};

export default AdminRoute;