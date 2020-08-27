import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import ReadOnlyInput from "./readOnlyInput";

class UnprotectedForm extends Component {
   state = { data: {} };

   handleSubmit = (e) => {
      e.preventDefault();
      this.doSubmit();
   };

   handleChange = ({ currentTarget: input }) => {
      const { data } = this.state;
      data[input.name] = input.value;
      this.setState({ data });
   };

   renderButton(label) {
      return (
         <button
            // disabled={this.validate()}
            className="btn btn-primary"
            onClick={this.handleSubmit}
         >
            {label}
         </button>
      );
   }

   renderPillButton(label) {
      return (
         <button
            className="pill-button"
            // disabled={this.validate()}
            onClick={this.handleSubmit}
         >
            <strong>{label}</strong>
         </button>
      );
   }

   renderInput(name, label, placeholder, type = "text") {
      const { data } = this.state;
      return (
         <Input
            type={type}
            name={name}
            value={data[name]}
            label={label}
            placeholder={placeholder}
            onChange={this.handleChange}
         />
      );
   }

   renderReadOnlyInput(
      name,
      label,
      column,
      columnMedium,
      placeholder,
      type = "text"
   ) {
      const { data } = this.state;
      return (
         <ReadOnlyInput
            type={type}
            name={name}
            value={data[name]}
            label={label}
            column={column}
            columnMedium={columnMedium}
            placeholder={placeholder}
            onChange={this.handleChange}
         />
      );
   }

   renderSelect(name, label, options) {
      const { data } = this.state;
      return (
         <Select
            name={name}
            label={label}
            options={options}
            onChange={this.handleChange}
            value={data[name]}
         />
      );
   }
}

export default UnprotectedForm;
