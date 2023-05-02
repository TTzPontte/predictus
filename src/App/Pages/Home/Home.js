import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Section from "../../components/Form/Section";
import Input from "../../components/Form/Input";
import Results from "../../Containers/Searches/Result/Results";

const Home = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const [state, setState] = useState({});

  const onSubmit = async ({ data }) => {
    console.log({ data });

    setState({ data });
  };

  return (
    <section className="page simulation">
      <Container fluid>
        <Row className="d-flex mb-4">
          <Col>
            <h1> Criar um novo contrato</h1>
          </Col>
        </Row>
        <div className="simulation-wrapper limit-grid">
          <Section
            header={
              <FormProvider {...methods}>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col>
                      <Input name="cpfCnpj" required />
                    </Col>
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </form>
              </FormProvider>
            }
          >
            <Row className="w-100">
              <Col className="w-100">
                {state?.data && state?.data.length > 1 && <Results list={state.data} />}
              </Col>
            </Row>
          </Section>
        </div>
      </Container>
    </section>
  );
};

export default Home;
