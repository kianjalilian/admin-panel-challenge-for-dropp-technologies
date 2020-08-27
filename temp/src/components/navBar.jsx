import { NavLink } from "react-router-dom";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = (props) => {
   const { hasUser } = props;

   return (
      <Navbar bg="light" expand="md" sticky="top">
         <Navbar.Brand href="#home">Dropp</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
               <NavLink className="nav-link" to="/home">
                  Home
               </NavLink>
               {hasUser && (
                  <NavLink className="nav-link" to="/admin-panel">
                     Admin Panel
                  </NavLink>
               )}
               {!hasUser && (
                  <NavLink className="nav-link" to="/login">
                     Login
                  </NavLink>
               )}
               {!hasUser && (
                  <NavLink className="nav-link" to="/register">
                     Register
                  </NavLink>
               )}
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
};

export default NavBar;
