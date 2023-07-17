import "./App.scss";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Pages/Home/Home";
import Test from "./Pages/test/Test";
import LambdaTeste from "./Pages/lambdaTeste/LambdaTeste";
import { withAuthenticator } from "@aws-amplify/ui-react";

import awsExports from "../aws-exports";
//
Amplify.configure(awsExports);

const Layout = ({ children }) => (
  <main id="main" className="main">
    <Container fluid>
      <header className="header header--sticky-default header--unlogged">
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <h1 className="">Consulta Serasa</h1>
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
        <Route path={"/test"} element={<Test />} />
        <Route path={"/lambdateste"} element={<LambdaTeste />} />
      </Route>
    </Routes>
  );
}

export default withAuthenticator(App);
//export default App;
