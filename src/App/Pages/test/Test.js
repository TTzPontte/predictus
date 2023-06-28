import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Form, Row, Button, Container } from "react-bootstrap";
import Radio from "../../components/Form/Radio";
import Results from "../../Containers/Searches/Result/Results";
import { createPDF, createPDFPJ } from "../../servicer/convertToPDF";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { Input } from "./components";
import { handlePDFCreation, handleCheckboxSelection } from "./helpers";

const radioOptions = [
  { label: "PF", value: "PF" },
  { label: "PJ", value: "PJ" }
];

const ActionButtons = ({ isResultViewVisible, state, state2, handleBaixarPDF, handleConsultarSocios }) => (
  <>
    {isResultViewVisible && (
      <>
        <Results list={state} pfOuPj={state2 === "PJ" ? "PJ" : undefined} />
        <Button variant="primary" onClick={handleBaixarPDF}>
          Baixar Relatório PDF
        </Button>
      </>
    )}

    {isResultViewVisible && (
      <>
        <Results list={state2} pfOuPj="PJ" />
        <Button variant="primary" onClick={handleConsultarSocios}>
          Consultar Sócios
        </Button>
      </>
    )}
  </>
);

function ReportForm() {
  const methods = useForm();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultViewVisible, setIsResultViewVisible] = useState(false);
  const [personType, setPersonType] = useState("");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = methods;

  const invokeLambda = async (functionName, payload) => {
    try {
      const credentials = await Auth.currentCredentials();
      console.log("---", { credentials });
      const lambda = new Lambda({ region: "us-east-1", credentials });
      const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
      };
      const result = await lambda.invoke(params).promise();
      return result;
    } catch (error) {
      setError(error);
    }
  };

  const getEnvironment = () => {
    const isLocal = window.location.hostname === "localhost";
    return isLocal ? "dev" : "prod";
  };

  const onSubmit = async (data) => {
    console.log("form: ", data);
    const environment = getEnvironment();
    const payload = {
      numDocument: data.documentNumber,
      tipoPessoa: data.radioGroup,
      ambiente: environment
    };
    console.log({ payload });
    const functionName = "ApiSerasa-serasa";
    setPersonType(data.radioGroup);
    setIsLoading(true);

    const handleResponse = (response) => {
      setState3(response);
      setState(response.reports);
      setIsResultViewVisible(true);
      setIsLoading(false);
      if (response.optionalFeatures.partner?.partnershipResponse !== undefined) {
        setState2(response.optionalFeatures.partner.partnershipResponse);
      }
    };

    try {
      const res = await invokeLambda(functionName, payload);
      const result = JSON.parse(res.Payload);
      const responseSerasa = result.response;
      console.log({ responseSerasa });
      handleResponse(responseSerasa);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      setIsLoading(false);
      alert(`Erro ao gerar relatório. Tente novamente mais tarde. Detalhes do erro: ${error.message}`);
    }
  };

  const handleConsultarSocios = async () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const getPayload = (documento, tipoPessoa) => ({
      numDocument: documento,
      tipoPessoa,
      ambiente: getEnvironment()
    });

    await handleCheckboxSelection(checkboxes, getPayload, invokeLambda, createPDF, createPDFPJ);
  };

  const handleBaixarPDF = () => {
    console.log("Baixar PDF clicado ", personType);
    const reportData = JSON.stringify(state3);
    handlePDFCreation(personType, reportData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group as={Row} controlId="formTipoPessoa">
                <Form.Label column sm={2}>
                  Tipo de Pessoa
                </Form.Label>
                <Col sm={10}>
                  <Radio label="" name="radioGroup" options={radioOptions} inline control={control} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formNumeroDocumento">
                <Form.Label column sm={2}>
                  Número do Documento
                </Form.Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    label=""
                    name="documentNumber"
                    placeholder="Document number"
                    register={register}
                    required
                  />
                  {errors.documentNumber && (
                    <Form.Text className="text-danger">{errors.documentNumber.message}</Form.Text>
                  )}
                </Col>
                <Form.Label column sm={2}>
                  ID Pipefy
                </Form.Label>
                <Col sm={4}>
                  <Input type="text" label="" name="idPipefy" placeholder="Id Pipefy" register={register} />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit">
                Realizar Consulta
              </Button>
            </Form>

            {isLoading && <h2>Carregando...</h2>}
            <ActionButtons
              {...{ isResultViewVisible, state, state2, handleBaixarPDF, handleConsultarSocios }}
            />
          </FormProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default ReportForm;
