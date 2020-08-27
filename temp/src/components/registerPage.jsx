import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import { Redirect, Link } from "react-router-dom";

class RegisterPage extends Form {
   state = {
      data: { email: "", password: "" },
      errors: {},
   };

   schema = {
      email: Joi.string().required().email().label("Email"),
      password: Joi.string()
         .required()
         .regex(/^[a-zA-Z0-9]{3,30}$/)
         .label("Password"),
   };

   doSubmit = async () => {
      console.log(this.state.data);
      try {
         const { data } = this.state;
         await register(data.email, data.password);
         this.props.history.push("/login");
         // const { state } = this.props.location;
         // window.location = state ? state.from.pathname : "/login";
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
                        src="https://wp-en.oberlo.com/wp-content/uploads/2019/11/motivational-quotes-for-employees.jpg"
                        alt=""
                        className="img-fluid"
                     />
                  </div>
               </div>
               <div className="col-md-6 px-4">
                  <i className="icon-center my-4 fa fa-5x fa-user-plus"></i>

                  <form className="mx-4 col-8" onSubmit={this.handleSubmit}>
                     <h1 className="my-3">Register</h1>
                     {this.renderInput("email", "", "Enter your email", "text")}
                     {this.renderInput(
                        "password",
                        "",
                        "Enter your password",
                        "password"
                     )}
                     <Link to="/login" className="mb-3 form-text text-right">
                        Already have an account?
                     </Link>
                     {this.renderPillButton("Sign up")}
                  </form>
                  <hr />
                  <p className="text-center mb-0">
                     <strong>or continue with</strong>
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

export default RegisterPage;
