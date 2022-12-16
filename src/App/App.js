import "./App.scss";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Searches from "./Containers/Searches/Searches";
import { withAuthenticator } from "@aws-amplify/ui-react";

import awsExports from "../aws-exports";

Amplify.configure(awsExports);

const Home = () => (
  <section className="page simulation">
    <Row className={"d-flex mb-4"}>
      <Col>
        <h1> Criar um novo contrato</h1>
      </Col>
    </Row>
    <div className="simulation-wrapper limit-grid">
      <Searches />
    </div>
  </section>
);
const Layout = ({ children }) => (
  <main id="main" className="main">
    <Container fluid>
      <header className="header header--sticky-default header--unlogged">
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <h1 className="">Teste </h1>
          </Navbar.Brand>
        </Navbar>
      </header>
      <div className="wrapper">
        <Outlet />
      </div>
    </Container>
  </main>
);

function App(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={"/"} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default withAuthenticator(App);
