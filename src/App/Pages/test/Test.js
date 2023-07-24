import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Form, Col, Row, FormGroup } from 'react-bootstrap';
import Radio from '../../components/Form/Radio';
import { createPDF, createPDFPJ } from '../../servicer/convertToPDF';
import Results from '../../Containers/Searches/Result/Results';
import { Auth } from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';
import Button from "react-bootstrap/Button";
import { DataStore } from '@aws-amplify/datastore';
import { Report, ClientType, ReportStatus } from '../../../models';

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

const createReport = async (payload)=>{
  const item = await DataStore.save(
    new Report({
    "documentNumber": payload.numDocument,
    "pipefyId": payload.idPipefy,
    "type": ClientType.PF,
    "status": ReportStatus.PROCESSING
    })
  );
  return item
}

async function updateReport(id, status) {
  const original = await DataStore.query(Report, id);
  const updateReport = await DataStore.save(
    Report.copyOf(original, updated => {
      updated.status = status
    })
  );
  return updateReport
}

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
    data.documentNumber = data.documentNumber.replace(/\D/g, ''); 
    console.log('documento: ', data.documentNumber)
    const ambiente = getEnvironment();
    const payload = {
      numDocument: data.documentNumber,
      tipoPessoa: data.radioGroup,
      idPipefy: data.idPipefy,
      ambiente
    };
    console.log({ payload });
    setLoading(true);
    
    const reportItem = await createReport(payload)
    console.log({reportItem})
    
    try {
      const result = await invokeLambda('ApiSerasa-serasa', payload);
      //const statusReq = response.statusCode;
      const requestSerasa = JSON.parse(result.Payload)
      const statusRequest = requestSerasa.statusCode
      
        if(statusRequest===200){
        const updateItem = await updateReport(reportItem.id, ReportStatus.SUCCESS)
        console.log({updateItem})
        const response = JSON.parse(result.Payload);
        console.log('Respostas:', { response });
        console.log({result})
        setState3(response.response);
        setState(response.response.reports);

        
        if (response.response.optionalFeatures?.partner?.partnershipResponse !== undefined) {
          setState2(response.response.optionalFeatures.partner.partnershipResponse);
          console.log({state2})
        }else{
          await updateReport(reportItem.id, ReportStatus.ERROR_SERASA)
        }
      }else{
        alert('Ocorreu um erro ao consultar o Serasa. Código do erro: ', String(statusRequest));
        await updateReport(reportItem.id, ReportStatus.ERROR_SERASA)
      }
      setPersonType(data.radioGroup);
    } catch (error) {
      await updateReport(reportItem.id, ReportStatus.ERROR_SERASA)
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

  const handleConsultarSociosClick = async () => {
    const functionName = "ApiSerasa-serasa";
    console.log('Consultar Sócios clicado');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
    for (const checkbox of checkboxes) {
      const status = checkbox.checked;
      const row = checkbox.closest('tr');
      const documento = row.querySelector('td:first-child').textContent;
      
      if (status === true) {
        console.log(documento);
        try {
          if (documento.length <= 12) {
            console.log("Documento: CPF")
            const payloadSociosPF = { numDocument: documento, tipoPessoa: "PF", ambiente: getEnvironment() };
            const responseOpcional = await invokeLambda(functionName, payloadSociosPF)
            const result = JSON.parse(responseOpcional.Payload);
            const responseSerasa = result.response;
            console.log({responseSerasa})
            createPDF(JSON.stringify(responseSerasa));
          } else {
            console.log('CNPJ');
            const payloadSociosPJ = { numDocument: documento, tipoPessoa: "PJ", ambiente: getEnvironment() };
            const responseOpcional = await invokeLambda(functionName, payloadSociosPJ)
            console.log({responseOpcional})
            const result = JSON.parse(responseOpcional.Payload);
            const responseSerasa = result.response;
            console.log({responseSerasa})
            createPDFPJ(JSON.stringify(responseSerasa));
          }
        } catch (error) {
          console.error('Ocorreu um erro na requisição:', error);
          alert(`Erro ao gerar relatório para: ${documento}. Detalhes do erro: ${error.message}`);
          // Tratar o erro de acordo com a necessidade
        }
      }
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
                <Form.Label></Form.Label>
                <Form.Control type="hidden" placeholder="Id Pipefy" {...register('idPipefy')} />
              </FormGroup>
            </Col>
          </Row><br />
          {errors.documentNumber && <span>{errors.documentNumber.message}</span>}
          <Button type="submit" color="primary">Realizar Consulta</Button><br />
          {loading && <h2>Carregando...</h2>}
          {state.length > 0 && <Results list={state} />}<br />
          {state.length > 0 && <Button onClick={handleDownloadPDF}>Baixar Relatório PDF</Button> }
          <br /><br />
          {state2.length > 0 && <Results list={state2} pfOuPj="PJ" />}<br />
          {state2.length > 0 && <Button onClick={handleConsultarSociosClick}>Consultar Sócios</Button> }
        </Form>
      </FormProvider>
  );
}

export default ReportForm;
