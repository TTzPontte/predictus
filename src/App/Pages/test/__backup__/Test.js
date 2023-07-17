import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Form, Row, Button, Container, Card, FormGroup } from "react-bootstrap";
import Radio from "../../components/Form/Radio";
import Results from "../../Containers/Searches/Result/Results";
import { createPDF, createPDFPJ } from "../../servicer/convertToPDF";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { handlePDFCreation, handleCheckboxSelection } from "./helpers";

const Input = ({ label, name, type, placeholder, required, register }) => {
  return (
      <FormGroup controlId={name}>
        <Form.Label className="w-100 text-nowrap">{label}</Form.Label>
        <Form.Control type={type} placeholder={placeholder} {...register(name, { required })} />
        {required && <Form.Text className="text-danger">This field is required</Form.Text>}
      </FormGroup>
  );
};

const invokeLambda = async (functionName, payload) => {
  try {
    const credentials = await Auth.currentCredentials();
    const lambda = new Lambda({ region: "us-east-1", credentials });
    const params = {
      FunctionName: functionName,
      Payload: JSON.stringify(payload),
    };
    const result = await lambda.invoke(params).promise();
    return result;
  } catch (error) {
    console.error("Error occurred while invoking Lambda:", error);
    throw error;
  }
};

const ReportForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResultViewVisible, setIsResultViewVisible] = useState(false);
  const [personType, setPersonType] = useState("");
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);

  const methods = useForm();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const getEnvironment = () => {
    const isLocal = window.location.hostname === "localhost";
    return isLocal ? "dev" : "prod";
  };

  const handleConsultarSocios = async (checkboxes) => {
    const getPayload = (documento, tipoPessoa) => ({
      numDocument: documento,
      tipoPessoa,
      ambiente: getEnvironment(),
    });

    try {
      await handleCheckboxSelection(checkboxes, getPayload, invokeLambda, createPDF, createPDFPJ);
    } catch (error) {
      console.error("Error occurred while fetching partner data:", error);
      alert("Error occurred while fetching partner data. Please try again later.");
    }
  };

  const handleBaixarPDF = () => {
    const reportData = JSON.stringify(state3);
    handlePDFCreation(personType, reportData);
  };

  const onSubmit = async (data) => {
    const environment = getEnvironment();
    const payload = {
      numDocument: data.documentNumber,
      tipoPessoa: data.radioGroup,
      ambiente: environment,
    };
    const functionName = "ApiSerasa-serasa";
    setPersonType(data.radioGroup);
    setIsLoading(true);

    try {
      const res = await invokeLambda(functionName, payload);
      debugger
      const result = JSON.parse(res.Payload);
      const responseSerasa = result.response;

      setState3(responseSerasa);
      setState(responseSerasa.reports);
      setIsResultViewVisible(true);

      if (data.radioGroup === "PF" && responseSerasa.optionalFeatures.partner?.partnershipResponse) {
        setState2(responseSerasa.optionalFeatures.partner.partnershipResponse);
      } else if (data.radioGroup === "PJ" && responseSerasa.optionalFeatures.partner?.PartnerResponse?.results) {
        setState2(responseSerasa.optionalFeatures.partner.PartnerResponse.results);
      }
    } catch (error) {
      console.error("Error occurred while generating report:", error);
      alert("Error occurred while generating report. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (isResultViewVisible) {
      return (
          <>
            <Results list={state} pfOuPj={state2 === "PJ" ? "PJ" : undefined} />
            <Button variant="primary" onClick={handleBaixarPDF}>
              Baixar Relatório PDF
            </Button>
            <Results list={state2} pfOuPj="PJ" />
            <Button variant="primary" onClick={() => handleConsultarSocios(document.querySelectorAll('input[type="checkbox"]'))}>
              Consultar Sócios
            </Button>
          </>
      );
    }
    return null;
  };

  const radioOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" },
  ];

  return (
      <FormProvider {...methods}>
        <Container>
          <Row>
            <Col md={8} className="mx-auto">
              <Card className="p-3">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group as={Row} controlId="formTipoPessoa">
                    <Form.Label column sm={3} className="text-nowrap">
                      Tipo de Pessoa
                    </Form.Label>
                    <Col sm={9}>
                      <Radio label="" name="radioGroup" options={radioOptions} inline control={control} />
                    </Col>
                  </Form.Group>
                  <Input
                      type="text"
                      label="Número do Documento"
                      name="documentNumber"
                      placeholder="Document number"
                      register={register}
                      required
                  />
                  <Input
                      type="text"
                      label="ID Pipefy"
                      name="idPipefy"
                      placeholder="Id Pipefy"
                      register={register}
                  />
                  <Button variant="primary" type="submit">
                    Realizar Consulta
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
          <br />
          {isLoading ? <div className="text-center">Carregando...</div> : renderResults()}
        </Container>
      </FormProvider>
  );
};

export default ReportForm;
