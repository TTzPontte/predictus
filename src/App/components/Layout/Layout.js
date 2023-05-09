import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <header className="header header--sticky-default header--unlogged">
        <Navigation />
      </header>
      <div className="wrapper">
        <Outlet />
        {children}
      </div>
    </Container>
  );
};

export default Layout;
