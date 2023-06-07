import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "react-bootstrap";
import {studioTheme} from "./ui-components";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={studioTheme}>
            <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuringCreateContract performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
