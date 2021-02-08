import { Container } from "react-bootstrap";
// import { AuthProvider } from "./contexts/AuthContext";
//vrf browser router här ?
import { Switch, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import SignupPage from "./Page/SignupPage";
import LoginPage from "./Page/LoginPage";
import UpdateProfilePage from "./Page/UpdateProfilePage";
import ForgotPasswordPage from "./Page/ForgotPasswordPage";
import StartPage from "./Page/StartPage";
import Navbar from "./NavBar/Navbar";
import AboutPage from "./Page/AboutPage";

function App() {
  return (
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}
    // >
      <div>
        <Navbar/>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/start" component={StartPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          {/* <Route path="/Start" component={ForgotPasswordPage} /> */}
        </Switch>
      </div>
    // </Container>
  );
}

export default App;
