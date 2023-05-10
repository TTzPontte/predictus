import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import './styles.scss';
const Navigation = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand>
                <h1>My Company</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    <Nav.Link href="/blog">Blog</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-dark">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
