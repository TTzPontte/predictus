import "./App.scss";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
// import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Pages/Home/Home";
import Test from "./Pages/test/Test";
import New from "./Pages/New";
import Layout from "./components/Layout";
// import { withAuthenticator } from "@aws-amplify/ui-react";

// import awsExports from "../aws-exports";
//
// Amplify.configure(awsExports);


function App(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/test"} element={<Test />} />
        <Route path={"/new"} element={<New />} />
      </Route>
    </Routes>
  );
}

// export default withAuthenticator(App);
export default App;
