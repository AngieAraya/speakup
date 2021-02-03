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

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
        </Switch>
      </div>
    </Container>
  );
}

export default App;
