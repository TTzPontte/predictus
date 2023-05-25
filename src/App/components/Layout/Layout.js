import React from "react";
import { Col, Container, Row, Navbar, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavBar2 } from "../../../ui-components";
// const listUrl = "http://localhost:3000/list"
// const createUrl = "http://localhost:3000/"
const listUrl = "https://ocr.d24qjdvw7n7v9p.amplifyapp.com/list";
const createUrl = "https://ocr.d24qjdvw7n7v9p.amplifyapp.com/";

const Layout = ({ children }) => (
    <div className="layout">
        <Navbar expand="lg" variant="light" bg="light">
            <Navbar.Brand href={createUrl}>
                <img src="logo.png" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href={listUrl}>Link 1</Nav.Link>
                    <Nav.Link href="#link">Link 2</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#avatar">
                        <img src="avatar.png" alt="Avatar" className="avatar" />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Container fluid className="content">
            <Row>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    </div>
);

export default Layout;
