import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet, NavLink } from 'react-router-dom';
import {NavBar2} from "../../../ui-components";
const listUrl = "http://localhost:3000/list"
const createUrl = "http://localhost:3000/"
const Layout = ({ children }) => (
    <div className="layout">
        <NavBar2 {...{createUrl, listUrl}}  />

        <Container fluid className="content">
            <Outlet  />
        </Container>
    </div>
);

export default Layout;
