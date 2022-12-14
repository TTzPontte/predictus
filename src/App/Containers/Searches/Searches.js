import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Form/Input";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { handler } from "../../servicer/Handler";
import axios from "axios";
import {getData} from "./service";
  // let url = "https://vtvxdbju7xurys7txbyhbl32r40zztti.lambda-url.us-east-1.on.aws/";
  let url = "https://apitcstaging.pontte.com.br/pipefy/v1/pipes";
const get = async () => {


  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" , 'Access-Control-Request-Headers': '*'},
    body: '{"data":{"cpfCnpj":"13749521000198"},"action":"getClientCPF"}'
  };
  const response = await fetch(url, options);
  console.log({response})
  return response.json();
};
const Form = ({ children }) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = async (data) => {
    getData()
    // await get();
    // console.log({ data });
    // const x = await handler(data);
    // console.log({ x });
  };
  return (
    <>
      <FormProvider {...methods}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Row className="form__grid">{children}</Row>
          <Row>
            <Col>
              <Button type={"submit"} variant={"primary"}>
                {" "}
                Submit{" "}
              </Button>
            </Col>
          </Row>
        </form>
      </FormProvider>
    </>
  );
};
const Searches = (props) => {
  const methods = useForm();
  return (
    <>
      <Container>
        <Row>
          <Form className="form__grid">
            <Input name="cpfCnpj" required />
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default Searches;
