//components.js
import React, {useState} from "react";
import {Col, Form, FormGroup, Row} from "react-bootstrap";
import Results from "../../Containers/Searches/Result/Results";
import {Auth} from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";

export const invokeLambda = async (functionName, payload) => {
    try {
        const credentials = await Auth.currentCredentials();
        const lambda = new Lambda({region: "us-east-1", credentials});
        const params = {
            FunctionName: functionName, Payload: JSON.stringify(payload)
        };
        const result = await lambda.invoke(params).promise();
        return JSON.parse(result.Payload);
    } catch (error) {
        // Handle the error here
    }
};

export const Input = ({label, name, type, placeholder, required, register}) => {
    return (<FormGroup controlId={name}>
            <Form.Label className={"w-100"}>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} {...register(name, {required})} />
        </FormGroup>);
};

export const ResultView = ({state}) => {
    return (<Row className="w-100">
            <Col className="w-100">{state && state.length > 0 && <Results list={state}/>}</Col>
        </Row>);
};

export const ResultView2 = ({state2}) => {
    return (<Row className="w-100">
            <Col className="w-100">{state2 && state2.length > 0 && <Results list={state2} pfOuPj="PJ"/>}</Col>
        </Row>);
};

export const radioOptions = [{label: "PF", value: "PF"}, {label: "PJ", value: "PJ"}];
