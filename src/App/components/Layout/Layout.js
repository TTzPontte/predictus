import { Outlet } from "react-router-dom";
import React from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import { Sidebar } from "../Sidebar/Sidebar";
import { Col, Container, Row } from "react-bootstrap";

// Pass currentUser as a prop to make it dynamic
function Layout({ currentUser = { email: "lucas@pontte.com.br" } }) {
  return (
    <div id="wrapper" className="main-content-wrapper">
      <Container fluid>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col id="content-wrapper" className="d-flex flex-column" style={{flex: 5}}>
            <Row>
              <div id="content" className="h-100">
              <TopNavbar currentUser={currentUser} />
                <Outlet />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
