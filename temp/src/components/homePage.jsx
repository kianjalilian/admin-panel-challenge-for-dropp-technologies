import React from "react";

const HomePage = ({ hasUser }) => {
   return (
      <div className=" mt-5 text-center">
         {hasUser && (
            <React.Fragment>
               <h1>Welcome!</h1>
               <p>You are logged in.</p>
               <p>You can navigate to admin panel.</p>
            </React.Fragment>
         )}
         {!hasUser && (
            <React.Fragment>
               <h1 className="display-1">Hi!</h1>
               <p>In order to access admin panel, you have to sign in</p>
            </React.Fragment>
         )}{" "}
      </div>
   );
};

export default HomePage;
