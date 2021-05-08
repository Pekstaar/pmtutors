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

const App = (props) => {

  useEffect(() => {
    window.addEventListener('unload', () => props.endSession())
  }, [])

  return (
    <div className="App">
      <NotificationContainer />

      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/quiz" exact component={QuizBank} />
        <PrivateRoute path="/myjobs" component={MyJobs} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/vetting" component={Vetting} />
        <PrivateRoute path="/quiz/:slug" component={Quiz} />
        <Route path="/pmtutorsadmin" exact component={Admin} />
        <Route path="/pmtutorsadmin/jobs" exact component={Jobs} />
        <Route path="/pmtutorsadmin/jobs/submitted" exact component={SubmittedJobs} />
        <Route path="/pmtutorsadmin/jobs/submitted/:slug" component={JobSubmitted} />
        <Route path="/pmtutorsadmin/vets" exact component={Vet} />
        <Route path="/pmtutorsadmin/vets/submitted" exact component={SubmittedVets} />
        <Route path="/pmtutorsadmin/vets/submitted/:slug" component={VetSubmitted} />
        <Route path="/pmtutorsadmin/clients" component={Clients} />f
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
