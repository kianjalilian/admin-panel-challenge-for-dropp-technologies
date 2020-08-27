import React from "react";

const ReadOnlyInput = ({
   name,
   label,
   column = 12,
   columnMedium = 12,
   ...rest
}) => {
   const getClasses = () => {
      return "form-group col-" + column + " col-md-" + columnMedium;
   };

   return (
      <div className={getClasses()}>
         <label htmlFor={name}>{label}</label>
         <input
            {...rest}
            name={name}
            id={name}
            className="form-control"
            readOnly
         />
      </div>
   );
};

export default ReadOnlyInput;
