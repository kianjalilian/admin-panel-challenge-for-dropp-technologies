import React from "react";

const Angle = ({ closed }) => {
   const calculateReturn = () => {
      if (closed) {
         return (
            <i className="float-right align-center mt-1 mr-5 fa fa-angle-down"></i>
         );
      } else {
         return (
            <i className="float-right align-center mt-1 mr-5 fa fa-angle-right"></i>
         );
      }
   };

   return <React.Fragment>{calculateReturn()}</React.Fragment>;
};

export default Angle;
