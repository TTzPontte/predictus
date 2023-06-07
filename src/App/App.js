import "./App.scss";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Home from "./Pages/Home";
import RunLambda from "./Pages/RunLambda";

// import awsExports from "../aws-exports";
import ListReport from "./Pages/ListReport";
import Layout from "./components/Layout";
import NewDocument from "./Pages/NewDocuments";

// Amplify.configure(awsExports);

function App(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/list"} element={<ListReport />} />
        <Route path={"/new"} element={<NewDocument />} />
        <Route path={"/run"} element={<RunLambda />} />
      </Route>
    </Routes>
  );
}

export default withAuthenticator(App);
