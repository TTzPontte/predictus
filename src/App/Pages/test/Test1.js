import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import Radio from "../../components/Form/Radio";
import Results from "../../Containers/Searches/Result/Results";
import {createPDF, createPDFPJ} from "../../servicer/convertToPDF"
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
 const invokeLambda = async (functionName, payload) => {
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
function Input({ label, name, type, placeholder, required, register }) {
  return (
    <FormGroup controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
    </FormGroup>
  );
}

const handleConsultarSocios = async () => {
  console.log('Consultar Sócios clicado');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  for (const checkbox of checkboxes) {
    const status = checkbox.checked;
    const row = checkbox.closest('tr');
    const documento = row.querySelector('td:first-child').textContent;

    const getEnvironment = () => {
      const isLocal = window.location.hostname === 'localhost';
      return isLocal ? 'dev' : 'prod';
    };

    if (status === true) {
      console.log(documento);
      try {
        if (documento.length <= 12) {
          const payloadSociosPF = { numDocument: documento, tipoPessoa: "PF", ambiente: getEnvironment() };
          const response = await invokeLambda("ApiSerasa-serasa", payloadSociosPF);
          const result = JSON.parse(response.Payload);
          const responseSerasa = result.response;
          console.log({ responseSerasa });
          createPDF(JSON.stringify(responseSerasa));
        } else {
          console.log('CNPJ');
          const payloadSociosPJ = { numDocument: documento, tipoPessoa: "PJ", ambiente: getEnvironment() };
          const response = await invokeLambda("ApiSerasa-serasa", payloadSociosPJ);
          const result = JSON.parse(response.Payload);
          const responseSerasa = result.response;
          console.log({ responseSerasa });
          createPDFPJ(JSON.stringify(responseSerasa));
        }
      } catch (error) {
        console.error('Ocorreu um erro na requisição:', error);
        alert(`Erro ao gerar relatório para: ${documento}. Detalhes do erro: ${error.message}`);
        // Handle the error according to your needs
      }
    }
  }
};

const handleBaixarPDF = (personType, state3) => {
  console.log('Baixar PDF clicado', personType);
  if (personType === "PF") {
    console.log('Clicado em PF');
    createPDF(JSON.stringify(state3));
  } else {
    console.log('Clicado em PJ');
    createPDFPJ(JSON.stringify(state3));
  }
};

const radioOptions = [
  { label: "PF", value: "PF" },
  { label: "PJ", value: "PJ" }
];

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
  const [isResultView2Visible, setIsResultView2Visible] = useState(false);
  const [personType, setPersonType] = useState("");

  const invokeLambda = useCallback(async (functionName, payload) => {
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
  }, []);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = methods;

  const getEnvironment = () => {
    const isLocal = window.location.hostname === 'localhost';
    return isLocal ? 'dev' : 'prod';
  };

  const onSubmit = async (data) => {
    console.log('form: ', data);
    const environment = getEnvironment();
    const payload = { numDocument: data.documentNumber, tipoPessoa: data.radioGroup, ambiente: environment };
    console.log({ payload });
    const functionName = "ApiSerasa-serasa";
    setPersonType(data.radioGroup);
    setIsLoading(true);

    try {
      const response = await invokeLambda(functionName, payload);
      console.log({ response, error });
      const result = JSON.parse(response.Payload);
      const responseSerasa = result.response;
      console.log({ responseSerasa });

      setState3(responseSerasa);
      setState(responseSerasa.reports);
      setIsResultViewVisible(true);

      if (responseSerasa.optionalFeatures?.partner?.partnershipResponse !== undefined) {
        setState2(responseSerasa.optionalFeatures.partner.partnershipResponse);
        setIsResultView2Visible(true);
      }
    } catch (error) {
      console.error('Ocorreu um erro na requisição:', error);
      alert(`Erro ao obter os dados. Detalhes do erro: ${error.message}`);
      // Handle the error according to your needs
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Radio
          label="Tipo de Pessoa"
          name="radioGroup"
          options={radioOptions}
          inline
          control={control}
        />
        <Row>
          <Col sm={4}>
            <Input
              type="text"
              label="Número do Documento"
              name="documentNumber"
              placeholder="Document number"
              register={register}
              required
            />
          </Col>
          <Col sm={5}>
            <Input
              type="text"
              label="ID Pipefy"
              name="idPipefy"
              placeholder="Id Pipefy"
              register={register}
            />
          </Col>
        </Row>
        {errors.documentNumber && <span>{errors.documentNumber.message}</span>}
        <br></br>
        <input type="submit" value="Realizar Consulta" /><br></br><br></br><br></br>
      </Form>
      <br></br><br></br>

      {isLoading ? <div><h2>Carregando...</h2></div> : null}
      <Row className="w-100">
        <Col className="w-100">
          {state && state.length > 0 && <Results list={state} />}
        </Col>
      </Row>
      {isResultViewVisible ? <button onClick={() => handleBaixarPDF(personType, state3)}>Baixar Relatório PDF</button> : null}<br></br><br></br><br></br>
      {isResultView2Visible ? <Row className="w-100">
        <Col className="w-100">
          {state2 && state2.length > 0 && <Results list={state2} pfOuPj="PJ" />}
        </Col>
      </Row> : null}<br></br>
      {isResultView2Visible ? <button onClick={handleConsultarSocios}>Consultar Sócios</button> : null}<br></br><br></br>
    </FormProvider>
  );
}

export default ReportForm;
