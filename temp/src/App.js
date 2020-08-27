import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import HomePage from "./components/homePage";
import LoginPage from "./components/loginPage";
import auth from "./services/authService";
import RegisterPage from "./components/registerPage";
import AdminPanel from "./components/adminPanel";
import ProtectedRoute from "./common/protectedRoute";
import UnprotectedRoute from "./common/unprotectedRoute";
import UserForm from "./components/userForm";
import ResourceForm from "./components/resourceForm";
import UserEditForm from "./components/userEditForm";
import NewUser from "./components/newUser";

class App extends Component {
   state = {
      hasUser: false,
   };

   componentDidMount() {
      const hasUser = auth.userLoggedIn();
      this.setState({ hasUser });
   }

   render() {
      const { hasUser } = this.state;

      return (
         <React.Fragment>
            <NavBar hasUser={hasUser} />
            <main className="container-fluid">
               <Switch>
                  <ProtectedRoute
                     path="/users/edit/:id"
                     component={UserEditForm}
                  />
                  <ProtectedRoute
                     path="/unknown/edit/:id"
                     component={ResourceForm}
                  />
                  <ProtectedRoute path="/users/:id" component={UserForm} />
                  <ProtectedRoute
                     path="/unknown/:id"
                     component={ResourceForm}
                  />
                  <ProtectedRoute path="/new" component={NewUser} />
                  <UnprotectedRoute
                     path="/login"
                     render={(props) => (
                        <LoginPage {...props} hasUser={hasUser} />
                     )}
                  />
                  <UnprotectedRoute
                     path="/register"
                     render={(props) => (
                        <RegisterPage {...props} hasUser={hasUser} />
                     )}
                  />
                  <ProtectedRoute
                     path="/admin-panel"
                     render={(props) => (
                        <AdminPanel {...props} hasUser={hasUser} />
                     )}
                  />
                  <Route
                     path="/home"
                     render={(props) => (
                        <HomePage {...props} hasUser={hasUser} />
                     )}
                  />
                  <Redirect path="/" to="/home" />
               </Switch>
            </main>
         </React.Fragment>
      );
   }
}

export default App;
