import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import Button from "react-bootstrap/Button";

const FirstPage = ({ handleUpload }) => {
    const NewButton = () => {
        const handleClick = () => {
            console.log("clicked");
            Auth.currentCredentials().then((credentials) => {
                const lambda = new Lambda({
                    credentials: Auth.essentialCredentials(credentials),
                    region: "us-east-1",
                });
                return lambda
                    .invoke({
                        FunctionName: "testInvoke",
                        Payload: JSON.stringify({ hello: "world" }),
                    })
                    .promise() // Convert the invoke method to a promise
                    .then((response) => {
                        console.log("Lambda response:", response);
                    })
                    .catch((error) => {
                        console.error("Lambda error:", error);
                    });
            });
        };
        return <Button onClick={handleClick}>Click me</Button>;
    };

    return (
        <section className="ofx2">
            <Row>
                <Col>
                    <NewButton />
                </Col>
            </Row>
        </section>
    );
};

FirstPage.propTypes = {
    handleUpload: PropTypes.func,
};

export default FirstPage;
