import React from "react";
import dataService from "../services/dataService";
import UnprotectedForm from "./../common/unprotectedForm";

class ResourceForm extends UnprotectedForm {
   state = {
      data: {
         name: "",
         id: "",
         year: "",
         color: "",
         pantone_value: "",
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
      console.log(path);
      const id = path.substr(path.lastIndexOf("/") + 1);
      const allData = await dataService.getResource(id);
      console.log(allData);
      const resourceData = allData.data;
      const { data, ad } = resourceData;
      console.log(data);
      const { name, year, color, pantone_value } = data;
      const { company, url, text } = ad;
      let newData = {};
      newData.name = name;
      newData.year = year;
      newData.color = color;
      newData.pantone_value = pantone_value;
      newData.company = company;
      newData.url = url;
      newData.text = text;
      newData.id = id;
      console.log(newData);
      this.setState({
         data: newData,
      });
   };

   render() {
      const { data } = this.state;
      if (data.name) {
         const {
            name,
            id,
            year,
            color,
            pantone_value,
            company,
            url,
            text,
         } = data;
         return (
            <div className="container bg-light mt-4">
               <form>
                  <h2>Resource Information</h2>
                  <div className="row">
                     {this.renderReadOnlyInput("name", "Name", 12, 6, {
                        name,
                     })}
                     {this.renderReadOnlyInput("color", "Color", 12, 6, {
                        color,
                     })}
                  </div>
                  <div className="row">
                     {this.renderReadOnlyInput("year", "Year", 12, 6, {
                        year,
                     })}
                     {this.renderReadOnlyInput(
                        "pantone_value",
                        "Pantone",
                        12,
                        6,
                        {
                           pantone_value,
                        }
                     )}
                  </div>
                  <div className="row">
                     {this.renderReadOnlyInput("url", "Url", 12, 4, {
                        url,
                     })}
                     {this.renderReadOnlyInput("id", "Id", 12, 4, {
                        id,
                     })}
                     {this.renderReadOnlyInput("company", "Company", 12, 4, {
                        company,
                     })}
                     {this.renderReadOnlyInput("text", "Text", 12, 12, {
                        text,
                     })}
                  </div>
               </form>
            </div>
         );
      } else {
         return <h1>Loading...</h1>;
      }
   }
}

export default ResourceForm;
