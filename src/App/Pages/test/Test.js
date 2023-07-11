import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Form, Col, Row, FormGroup } from 'react-bootstrap';
import Radio from '../../components/Form/Radio';
import { createPDF, createPDFPJ } from '../../servicer/convertToPDF';
import Results from '../../Containers/Searches/Result/Results';
import { Auth } from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';
import Button from "react-bootstrap/Button";

const radioOptions = [
  { label: 'PF', value: 'PF' },
  { label: 'PJ', value: 'PJ' }
];

const getEnvironment = () => (window.location.hostname === 'localhost' ? 'dev' : 'prod');

const invokeLambda = async (functionName, payload) => {
  const credentials = await Auth.currentCredentials();
  const lambda = new Lambda({ region: 'us-east-1', credentials });

  return lambda.invoke({
    FunctionName: functionName,
    Payload: JSON.stringify(payload)
  }).promise();
};

function ReportForm() {
  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);
  const [personType, setPersonType] = useState("");

  const onSubmit = async (data) => {
    console.log('form: ', data);
    const ambiente = getEnvironment();
    const payload = {
      numDocument: data.documentNumber,
      tipoPessoa: data.radioGroup,
      ambiente
    };
    console.log({ payload });
    setLoading(true);

    try {
      const result = await invokeLambda('ApiSerasa-serasa', payload);
      const response = JSON.parse(result.Payload);
      console.log({ response });

      setState3(response.response);
      setState(response.response.reports);
      if (response.response.optionalFeatures?.partner?.partnershipResponse !== undefined) {
        setState2(response.response.optionalFeatures.partner.partnershipResponse);
      }

      setPersonType(data.radioGroup);
    } catch (error) {
      console.log('Ocorreu um erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (personType === 'PF') {
      createPDF(JSON.stringify(state3));
    } else {
      createPDFPJ(JSON.stringify(state3));
    }
  };

  return (
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Radio label="Tipo de Pessoa" name="radioGroup" options={radioOptions} inline control={control} />
          <Row>
            <Col sm={4}>
              <FormGroup controlId="documentNumber">
                <Form.Label>Número do Documento</Form.Label>
                <Form.Control type="text" placeholder="Document number" {...register('documentNumber', { required: true })} />
              </FormGroup>
            </Col>
            <Col sm={5}>
              <FormGroup controlId="idPipefy">
                <Form.Label>ID Pipefy</Form.Label>
                <Form.Control type="text" placeholder="Id Pipefy" {...register('idPipefy')} />
              </FormGroup>
            </Col>
          </Row>
          {errors.documentNumber && <span>{errors.documentNumber.message}</span>}
          <Button type="submit" color="primary">Realizar Consulta</Button>
          {loading && <h2>Carregando...</h2>}
          {state.length > 0 && <Results list={state} />}
          <Button onClick={handleDownloadPDF}>Baixar Relatório PDF</Button>
          {state2.length > 0 && <Results list={state2} pfOuPj="PJ" />}
        </Form>
      </FormProvider>
  );
}

export default ReportForm;
