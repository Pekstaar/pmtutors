// import useStyles from './css/app.min.js'
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home'
import Admin from './admin/Admin'
import Jobs from "./admin/pages/Jobs";
import Vet from "./admin/pages/Vet";
import JobSubmitted from "./admin/pages/JobSubmitted"
import SubmittedVets from "./admin/pages/SubmittedVets"
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import PrivateRoute from "./routing/PrivateRouter";
import QuizBank from "./pages/QuizBank";
import Quiz from "./pages/Quiz";
import MyJobs from "./pages/MyJobs";
import Clients from "./admin/pages/Clients";
import SubmittedJobs from "./admin/pages/SubmittedJobs";
import Vetting from "./pages/Vetting";
import VetSubmitted from "./admin/pages/VetSubmitted";
import { signOut } from "./store/actions/authAction";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Register } from "./admin/auth/AdminSignUp";
import Complete from "./admin/auth/Complete";
import AdminRoute from "./routing/AdminRouter";
import AdminLogin from "./admin/auth/Login";
import Account from "./pages/Account";

const App = (props) => {

  useEffect(() => {
    window.addEventListener('unload', () => props.endSession())
  }, [props])

  return (
    <div className="App">
      <NotificationContainer />

      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/quiz" exact component={QuizBank} />
        <PrivateRoute path="/myjobs" component={MyJobs} />
        {/* <Route path="/index" component={index} /> */}
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/vetting" component={Vetting} />
        <PrivateRoute path="/quiz/:slug" component={Quiz} />
        <AdminRoute path="/pmtutorsadmin" exact component={Admin} />
        <AdminRoute path="/pmtutorsadmin/jobs" exact component={Jobs} />
        <AdminRoute path="/pmtutorsadmin/jobs/submitted" exact component={SubmittedJobs} />
        <AdminRoute path="/pmtutorsadmin/jobs/submitted/:slug" component={JobSubmitted} />
        <AdminRoute path="/pmtutorsadmin/vets" exact component={Vet} />
        <AdminRoute path="/pmtutorsadmin/vets/submitted" exact component={SubmittedVets} />
        <AdminRoute path="/pmtutorsadmin/vets/submitted/:slug" component={VetSubmitted} />
        <AdminRoute path="/pmtutorsadmin/clients" component={Clients} />
        <Route path="/pmtutorsadmin/register" exact component={Register} />
        <Route path="/pmtutorsadmin/register/complete" component={Complete} />
        <Route path="/pmtutorsadmin/login" component={AdminLogin} />
      </Switch>

    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    endSession: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(App);
