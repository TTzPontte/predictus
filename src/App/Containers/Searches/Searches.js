import React, { useEffect, useState } from "react";
import Input from "../../components/Form/Input";
import { Col, Container, Row } from "react-bootstrap";
import Results from "./Result/Results";
import SimpleForm from "./Form/SimpleForm";
import Section from "../../components/Form/Section";

const Searches = (props) => {
  const [state, setState] = useState({});
  useEffect(() => {
    return () => {
      console.log({ state });
    };
  }, [state]);

  return (
    <>
      <Container fluid>
        <Section
          header={
            <Row>
              <Col>
                <SimpleForm  {...{ state, setState }}>
                  <Input name="cpfCnpj" required />
                </SimpleForm>
              </Col>
            </Row>
          }
        >
            <Row className={"w-100"}>
              <Col className={"w-100"}>
                {state?.data && state?.data.length > 1 && <Results {...{ list: state.data }} />}
              </Col>
            </Row>
        </Section>
      </Container>
    </>
  );
};

export default Searches;
