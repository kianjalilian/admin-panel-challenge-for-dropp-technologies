import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import dataService from "../services/dataService";

class NewUser extends Form {
   state = {
      data: { name: "", job: "" },
      errors: {},
   };

   schema = {
      name: Joi.string().required().label("Name"),
      job: Joi.string().label("Job"),
   };

   doSubmit = async () => {
      try {
         const { data } = this.state;
         const path = this.props.location.pathname;
         const id = path.substr(path.lastIndexOf("/") + 1);
         await dataService.createUser(JSON.stringify(data));
         this.props.history.push("/admin-panel");
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.email = error.response.data;
            this.setState({ errors });
         }
      }
   };

   render() {
      return (
         <div className="container">
            <div className="bg-light text-dark my-4">
               <div className="row m-2">
                  {this.renderInput(
                     "name",
                     "",
                     "Enter user Name",
                     "text",
                     12,
                     6
                  )}
                  {this.renderInput("job", "", "Enter user job", "text", 12, 6)}
               </div>
               <div className="text-center pb-2">
                  {this.renderButton("Create")}
               </div>
            </div>
         </div>
      );
   }
}

export default NewUser;
