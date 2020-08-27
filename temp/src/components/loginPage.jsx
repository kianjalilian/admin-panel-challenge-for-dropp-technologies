import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginPage extends Form {
   state = {
      data: { email: "", password: "" },
      errors: {},
   };

   schema = {
      email: Joi.string().required().label("Email"),
      password: Joi.string().required().label("Password"),
   };

   // schema = Joi.object({
   //    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

   //    // repeat_password: Joi.ref("password"),

   //    email: Joi.string(),
   // });
   // .xor("password", "access_token")
   // .with("password", "repeat_password");

   // schema = Joi.object({
   //    a: Joi.string(),
   // });

   // schema = Joi.object({
   //    email: Joi.string().required().label("email"),
   //    password: Joi.string().required().label("password"),
   // });

   doSubmit = async () => {
      try {
         const { data } = this.state;
         await auth.login(data.email, data.password);
         window.location = "/";
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.email = error.response.data.error;
            this.setState({ errors });
         }
      }
   };

   render() {
      const { hasUser } = this.props;
      if (hasUser) return <Redirect to="/" />;

      return (
         <div className="container">
            <div className="row bg-light text-dark my-4">
               <div className="col-md-6 p-0">
                  <div className="js-img">
                     <img
                        src="https://wp-en.oberlo.com/wp-content/uploads/2019/11/motivational-quotes-for-entrepreneurs.jpg"
                        alt=""
                        className="img-fluid"
                     />
                  </div>
               </div>
               <div className="col-md-6 px-4">
                  <i className="icon-center my-4 fa fa-user fa-5x"></i>

                  <form className="mx-4 col-8" onSubmit={this.handleSubmit}>
                     <h1 className="my-3">Login</h1>
                     {this.renderInput("email", "", "Enter your email", "text")}
                     {this.renderInput(
                        "password",
                        "",
                        "Enter your password",
                        "password"
                     )}
                     <p className="form-text text-right clickable">
                        Forget your password?
                     </p>
                     {this.renderPillButton("Login")}
                  </form>
                  <hr />
                  <p className="text-center mb-0">
                     <strong>You can also login with</strong>
                  </p>
                  <div className="row mt-2 d-flex justify-content-center">
                     <i className="login-icon fa fa-3x fa-facebook-square"></i>
                     <i className="login-icon mx-3 fa fa-3x fa-google-plus-square"></i>
                     <i className="login-icon fa fa-3x fa-twitter-square"></i>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default LoginPage;
