import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
   state = { data: {}, errors: {} };

   validate = () => {
      const options = { abortEarly: false };
      const { error } = Joi.validate(this.state.data, this.schema, options);
      if (!error) return null;

      const errors = {};
      for (let item of error.details) {
         errors[item.path[0]] = item.message;
      }
      return errors;
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const errors = Joi.validate();
      this.setState({ errors: errors || {} });
      if (errors.error) return;
      this.doSubmit();
   };

   validateProperty = ({ name, value }) => {
      const obj = { [name]: value };
      const localSchema = { [name]: this.schema[name] };

      const { error } = Joi.validate(obj, localSchema);

      return error ? error.details[0].message : null;
   };

   handleChange = ({ currentTarget: input }) => {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];

      console.log(errorMessage);
      console.log(errors);

      const { data } = this.state;
      data[input.name] = input.value;
      this.setState({ data, errors });
   };

   renderButton(label) {
      return (
         <button
            disabled={this.validate()}
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
            disabled={this.validate()}
            onClick={this.handleSubmit}
         >
            <strong>{label}</strong>
         </button>
      );
   }

   renderInput(
      name,
      label,
      placeholder,
      type = "text",
      column = 12,
      columnMedium = 12
   ) {
      const { data, errors } = this.state;
      return (
         <Input
            type={type}
            name={name}
            value={data[name]}
            label={label}
            placeholder={placeholder}
            onChange={this.handleChange}
            error={errors[name]}
            column={column}
            columnMedium={columnMedium}
         />
      );
   }

   renderSelect(name, label, options) {
      const { data, errors } = this.state;
      return (
         <Select
            name={name}
            label={label}
            options={options}
            error={errors[name]}
            onChange={this.handleChange}
            value={data[name]}
         />
      );
   }
}

export default Form;
