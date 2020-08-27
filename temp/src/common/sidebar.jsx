import React, { useState } from "react";
import { Card, Accordion, Navbar, Button } from "react-bootstrap";
import Angle from "./angle";
import { Link } from "react-router-dom";

const Sidebar = ({ onListClick }) => {
   const [userClosed, setUser] = useState(false);
   const [resourceClosed, setResource] = useState(false);

   const handleUserClick = () => {
      setUser(!userClosed);
      if (!userClosed) setResource(false);
      // console.log(resourceOpen);
   };

   const handleResourceClick = () => {
      setResource(!resourceClosed);
      if (!resourceClosed) setUser(false);
   };

   const logout = () => {
      localStorage.removeItem("token");
      window.location = "/login";
   };

   // function CustomToggle({ children, eventKey }) {
   //    const decoratedOnClick = useAccordionToggle(eventKey, () =>
   //      console.log('totally custom!'),
   //    );

   //    return (
   //      <button
   //        type="button"
   //        style={{ backgroundColor: 'pink' }}
   //        onClick={decoratedOnClick}
   //      >
   //        {children}
   //      </button>
   //    );
   //  }

   return (
      <div className="bg-dark col-md-2 p-0">
         {/* <Navbar expand="false">
            <Navbar.Brand className="text-white">User</Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse>
               <button type="button" className="btn text-white button-custom">
                  List
               </button>
               <br />
               <button type="button" className="btn text-white button-custom">
                  Create New User
               </button>
            </Navbar.Collapse>
         </Navbar>
         <Navbar expand="false">
            <Navbar.Brand className="text-white">Resource</Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse>
               <button type="button" className="btn text-white button-custom">
                  List
               </button>
            </Navbar.Collapse>
         </Navbar> */}
         <Accordion>
            <Card className="bg-dark text-white">
               <Accordion.Toggle
                  as={Card.Header}
                  onClick={handleUserClick}
                  variant="link"
                  eventKey="0"
               >
                  User
                  <Angle closed={userClosed} />
               </Accordion.Toggle>

               <Accordion.Collapse eventKey="0">
                  <Card.Body>
                     <button
                        type="button"
                        onClick={() => onListClick("User")}
                        className="btn text-white button-custom"
                     >
                        List
                     </button>
                     <br />
                     <Link className="btn text-white button-custom" to="/new">
                        Create New User
                     </Link>
                  </Card.Body>
               </Accordion.Collapse>
            </Card>
            <Card className="bg-dark text-white">
               <Accordion.Toggle
                  as={Card.Header}
                  onClick={handleResourceClick}
                  variant="link"
                  eventKey="1"
               >
                  Resource
                  <Angle closed={resourceClosed} />
               </Accordion.Toggle>
               <Accordion.Collapse eventKey="1">
                  <Card.Body>
                     <button
                        type="button"
                        onClick={() => onListClick("Resource")}
                        className="btn text-white button-custom"
                     >
                        List
                     </button>
                  </Card.Body>
               </Accordion.Collapse>
            </Card>
         </Accordion>
         <div className="mt-3">
            <button
               onClick={logout}
               className="btn btn-dark d-flex justify-content-center m-auto"
            >
               Exit
            </button>
         </div>
      </div>
   );
};

export default Sidebar;
