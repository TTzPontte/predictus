import React, {useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "./Layout.scss";
import {LogOutButton, NavBar, NavBar2} from "../../../ui-components";
import { Button } from "@aws-amplify/ui-react";
// const listUrl = "http://localhost:3000/list"
// const createUrl = "http://localhost:3000/"

const Layout = ({ children }) => {
    const [show, setShow] = useState(false)
    const props = {
        listUrl: "https://ocr.d24qjdvw7n7v9p.amplifyapp.com/list",
        createUrl: "https://ocr.d24qjdvw7n7v9p.amplifyapp.com/",
        avatarUrl:
            "https://img.freepik.com/premium-psd/3d-cartoon-character-avatar-isolated-3d-rendering_235528-548.jpg?w=2000",
        onClickAvatar: ()=>setShow(!show)
    };

    return (
        <div className="layout">
            <NavBar2 {...props} width={"100"}></NavBar2>
            <Container fluid className={"justify-content-end"} style={{display: show? 'block': 'none'}}>
                <Col>
                    <Row className={"justify-content-end"}>
                        <LogOutButton />
                    </Row>
                </Col>
            </Container>
            <Container fluid className="content">
                <Row>
                    <Col>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Layout;
