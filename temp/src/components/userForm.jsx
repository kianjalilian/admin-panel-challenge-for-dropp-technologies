import React from "react";
import dataService from "../services/dataService";
import UnprotectedForm from "./../common/unprotectedForm";

class UserForm extends UnprotectedForm {
   state = {
      data: {
         email: "",
         id: "",
         first_name: "",
         last_name: "",
         avatar: "",
         company: "",
         url: "",
         text: "",
      },
   };

   componentDidMount() {
      this.getInformation();
   }

   getInformation = async () => {
      const path = this.props.location.pathname;
      const id = path.substr(path.lastIndexOf("/") + 1);
      const allData = await dataService.getUser(id);
      const userData = allData.data;
      const { data, ad } = userData;
      const { email, first_name, last_name, avatar } = data;
      const { company, url, text } = ad;
      let newData = {};
      newData.email = email;
      newData.first_name = first_name;
      newData.last_name = last_name;
      newData.avatar = avatar;
      newData.company = company;
      newData.url = url;
      newData.text = text;
      newData.id = id;
      this.setState({
         data: newData,
      });
   };

   handleEdit = () => {
      const path = this.props.location.pathname;
      const id = path.substr(path.lastIndexOf("/") + 1);
      console.log("pushing history");
      this.props.history.push("/users/edit/" + id);
   };

   render() {
      const { data } = this.state;
      if (data.email) {
         const {
            email,
            id,
            first_name,
            last_name,
            avatar,
            company,
            url,
            text,
         } = data;
         console.log(id);
         return (
            <div className="container bg-light mt-4">
               <form>
                  <h2>User Information</h2>
                  <img
                     className="img-thumbnail mx-auto d-block"
                     src={avatar}
                     alt="user avatar"
                  />
                  <div className="row">
                     {this.renderReadOnlyInput("email", "Email", 12, 6, {
                        email,
                     })}
                     {this.renderReadOnlyInput("company", "Company", 12, 6, {
                        company,
                     })}
                  </div>
                  <div className="row">
                     {this.renderReadOnlyInput(
                        "first_name",
                        "First Name",
                        12,
                        6,
                        {
                           first_name,
                        }
                     )}
                     {this.renderReadOnlyInput(
                        "last_name",
                        "Last Name",
                        12,
                        6,
                        {
                           last_name,
                        }
                     )}
                  </div>
                  <div className="row">
                     {this.renderReadOnlyInput("url", "Url", 12, 6, {
                        url,
                     })}
                     {this.renderReadOnlyInput("id", "Id", 12, 6, {
                        id,
                     })}
                     {this.renderReadOnlyInput("text", "Text", 12, 12, {
                        text,
                     })}
                  </div>

                  <button
                     className="btn btn-secondary mr-5 mb-2"
                     onClick={this.handleEdit}
                  >
                     Edit
                  </button>
                  <button className="btn btn-danger mb-2">Delete</button>
               </form>
            </div>
         );
      } else {
         return <h1>Loading...</h1>;
      }
   }
}

export default UserForm;
