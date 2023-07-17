import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Card, Col, Container, Form, FormGroup, Row, Button, Spinner, Alert } from "react-bootstrap";
import { AiOutlineFilePdf, AiOutlineSearch } from "react-icons/ai";
import Radio from "../../../components/Form/Radio";
import Results from "../../../Containers/Searches/Result/Results";
import { createPDF, createPDFPJ } from "../../../servicer/convertToPDF";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";

const useLambda = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const invokeLambda = async (functionName, payload) => {
    try {
      setLoading(true);
      const credentials = await Auth.currentCredentials();
      const lambda = new Lambda({ region: "us-east-1", credentials });
      const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload),
      };
      const result = await lambda.invoke(params).promise();
      setResponse(result);
      return result;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, invokeLambda };
};

const Input = ({ label, name, type, placeholder, required, register, error }) => (
    <FormGroup controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
          type={type}
          placeholder={placeholder}
          {...register(name, { required })}
          isInvalid={error}
      />
      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </FormGroup>
);

const ResultView = ({ state }) => (
    <Row className="w-100">
      <Col className="w-100">
        {state?.length > 0 ? (
            <Results list={state} />
        ) : (
            <div className="text-center mt-4">No results found.</div>
        )}
      </Col>
    </Row>
);

const ResultView2 = ({ state2 }) => (
    <Row className="w-100">
      <Col className="w-100">
        {state2?.length > 0 ? (
            <Results list={state2} pfOuPj="PJ" />
        ) : (
            <div className="text-center mt-4">No partner results found.</div>
        )}
      </Col>
    </Row>
);

const ReportForm = () => {
  const methods = useForm();
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultViewVisible, setIsResultViewVisible] = useState(false);
  const [isResultView2Visible, setIsResultView2Visible] = useState(false);
  const [personType, setPersonType] = useState("");
  const [formError, setFormError] = useState("");

  const { control, handleSubmit, register, formState: { errors } } = methods;
  const { response, error, loading, invokeLambda } = useLambda();

  const getEnvironment = () => {
    const isLocal = window.location.hostname === "localhost";
    return isLocal ? "dev" : "prod";
  };

  const onSubmit = async (data) => {
    const environment = getEnvironment();
    const payload = { numDocument: data.documentNumber, tipoPessoa: data.radioGroup, ambiente: environment };
    const functionName = "ApiSerasa-serasa";
    setPersonType(data.radioGroup);
    setIsLoading(true);
    setFormError("");

    const res = await invokeLambda(functionName, payload);
    if (res.error) {
      setFormError("Error occurred while fetching data. Please try again later.");
      setIsLoading(false);
      return;
    }

    const result = JSON.parse(res.response.Payload);
    const responseSerasa = result.response;

    setState3(responseSerasa);
    setState(responseSerasa.reports);
    setIsResultViewVisible(true);

    if (data.radioGroup === "PF" && responseSerasa.optionalFeatures.partner?.partnershipResponse) {
      setState2(responseSerasa.optionalFeatures.partner.partnershipResponse);
      setIsResultView2Visible(true);
    } else if (data.radioGroup === "PJ" && responseSerasa.optionalFeatures.partner?.PartnerResponse?.results) {
      setState2(responseSerasa.optionalFeatures.partner.PartnerResponse.results);
      setIsResultView2Visible(true);
    }

    setIsLoading(false);
  };

  const handleConsultarSocios = async () => {
    const functionName = "ApiSerasa-serasa";
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (const checkbox of checkboxes) {
      const status = checkbox.checked;
      const row = checkbox.closest("tr");
      const documento = row.querySelector("td:first-child").textContent;

      const getEnvironment = () => {
        const isLocal = window.location.hostname === "localhost";
        return isLocal ? "dev" : "prod";
      };

      if (status === true) {
        try {
          const payloadSocios = {
            numDocument: documento,
            tipoPessoa: documento.length <= 12 ? "PF" : "PJ",
            ambiente: getEnvironment(),
          };

          const res = await invokeLambda(functionName, payloadSocios);
          if (res.error) {
            console.error("Error occurred while fetching partner data:", res.error);
            alert(`Error occurred while fetching partner data for: ${documento}. Please try again later.`);
            continue;
          }

          const result = JSON.parse(res.response.Payload);
          const responseSerasa = result.response;

          if (payloadSocios.tipoPessoa === "PF") {
            createPDF(JSON.stringify(responseSerasa));
          } else {
            createPDFPJ(JSON.stringify(responseSerasa));
          }
        } catch (error) {
          console.error("Error occurred while fetching partner data:", error);
          alert(`Error occurred while fetching partner data for: ${documento}. Please try again later.`);
        }
      }
    }
  };

  const handleBaixarPDF = () => {
    if (personType === "PF") {
      createPDF(JSON.stringify(state3));
    } else {
      createPDFPJ(JSON.stringify(state3));
    }
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
                  <Radio
                      label="Tipo de Pessoa"
                      name="radioGroup"
                      options={radioOptions}
                      inline
                      control={control}
                  />
                  <Row>
                    <Col sm={6}>
                      <Input
                          type="text"
                          label="Número do Documento"
                          name="documentNumber"
                          placeholder="Enter document number"
                          register={register}
                          required
                          error={errors.documentNumber}
                      />
                    </Col>
                    <Col sm={6}>
                      <Input
                          type="text"
                          label="ID Pipefy"
                          name="idPipefy"
                          placeholder="Enter Pipefy ID"
                          register={register}
                      />
                    </Col>
                  </Row>
                  {formError && <Alert variant="danger">{formError}</Alert>}
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                        <Spinner animation="border" role="status" size="sm" className="mr-2">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                    ) : (
                        <AiOutlineSearch className="mr-2" />
                    )}
                    Realizar Consulta
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
          <br />

          {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" role="status" />
                <span className="sr-only">Loading...</span>
              </div>
          ) : (
              <>
                <ResultView state={state} />
                {isResultViewVisible && (
                    <Button variant="primary" onClick={handleBaixarPDF} className="mr-2">
                      <AiOutlineFilePdf className="mr-2" />
                      Baixar Relatório PDF
                    </Button>
                )}
                {isResultView2Visible && (
                    <Button variant="primary" onClick={handleConsultarSocios}>
                      Consultar Sócios
                    </Button>
                )}
                <ResultView2 state2={state2} />
              </>
          )}
        </Container>
      </FormProvider>
  );
};

export default ReportForm;
