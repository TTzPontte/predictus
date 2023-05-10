import { Outlet } from "react-router-dom";
import React from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import { Col, Container, Row } from "react-bootstrap";
import { Sidebar } from "../Sidebar/Sidebar";

function Layout({ currentUser }) {
  const defaultUser = { email: "lucas@pontte.com.br" };
  const user = currentUser || defaultUser;

  return (
    <div style={{ backgroundColor: "#F0F0F7", height: "100vh" }}>
      <div id="wrapper" className="main-content-wrapper">
        <Container fluid>
          <Row className="h-100">
            <Col xs={2}>
              <Sidebar />
            </Col>
            <Col xs={10}>
              <TopNavbar currentUser={user} />
              <Row>
                <Col>
                  <div id="content" >
                    <Outlet />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Layout;
