import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SignupPage from "./Page/SignupPage";
import LoginPage from "./Page/LoginPage";
import UpdateProfilePage from "./Page/UpdateProfilePage";
import ForgotPasswordPage from "./Page/ForgotPasswordPage";
import StartPage from "./Page/StartPage";
import Navbar from "./components/NavBar/Navbar";
import AboutPage from "./Page/AboutPage";
import CreatePostPage from "./Page/CreatePostPage";
import DetailPostPage from "./Page/DetailPostPage";
import ProfilePage from "./Page/ProfilePage";
import UpdatePostPage from "./Page/UpdatePostPage";

function App() {
  return (
      <div>
        <Navbar/>
        <Switch>
          {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
          <PrivateRoute exact path="/update-post/:id" component={UpdatePostPage} />
          <PrivateRoute exact path="/create-post" component={CreatePostPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/detail/:id" component={DetailPostPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/start" component={StartPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
        </Switch>
      </div>
  );
}

export default App;
