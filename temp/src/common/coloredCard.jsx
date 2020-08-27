import React from "react";

const ColoredClasses = ({
   column,
   columnMedium,
   background,
   textColor,
   hasHeader,
   header,
   title,
   text,
   hasTitleIcon,
   titleIcon,
}) => {
   const getColumnClasses = () => {
      return "mt-4 col-" + column + " col-md-" + columnMedium;
   };

   const getCardClasses = () => {
      return "card p-4 mb-3 text-" + textColor + " bg-" + background;
   };

   // return (
   //    <div className={getColumnClasses()}>
   //       <div className={getCardClasses()}>
   //          {hasHeader && <div className="card-header">{header}</div>}
   //          <div className="card-body">
   //             <h3 className="card-title">
   //                {title} {hasTitleIcon && titleIcon}
   //             </h3>

   //             <p className="card-text">{text}</p>
   //          </div>
   //       </div>
   //    </div>
   // );
   return (
      <div className={getColumnClasses()}>
         <div className={getCardClasses()}>
            <div className="row">
               <div className="col-3 align-middle m-auto">
                  {hasTitleIcon && titleIcon}
               </div>
               <div className="col-9">
                  {hasHeader && <div className="card-header">{header}</div>}
                  <div className="card-body">
                     <h3 className="card-title">{title}</h3>

                     <p className="card-text">{text}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ColoredClasses;
