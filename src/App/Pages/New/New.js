import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { generateBusinessReport, generateReport } from "./service";
import {createPDF, createPDFPJ} from "./convertToPDF";

function FormComponent() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();
  const [reports, setReports] = useState([]);
  const [relatorio, setRelatorio] = useState([]);
  const [partnershipResponse, setPartnershipResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultViewVisible, setIsResultViewVisible] = useState(false);
  const [personType, setPersonType] = useState("");

  const submitForm = async (data) => {
    setIsLoading(true);
    setPersonType(data.radioGroup);
    const generateReportFunc = data.radioGroup === "PF" ? generateReport : generateBusinessReport;
  
    try {
      const response = await generateReportFunc(data.documentNumber);
      setReports(response.reports);
      setRelatorio(response);
      console.log({ reports });
      setPartnershipResponse(
        data.radioGroup === "PF"
          ? response.optionalFeatures.partner.partnershipResponse
          : response.optionalFeatures.partner.PartnerResponse.results
      );
      console.log({ partnershipResponse });
      setIsResultViewVisible(true);
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(`Ocorreu um erro na requisição: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  function handleCheckboxChange(event) {
    const checkboxValue = event.target.checked;
    const partnershipId = event.target.value;
    const partnership = partnershipResponse.find((p) => p.businessDocument === partnershipId);
    if (partnership) {
      const businessDocument = partnership.businessDocument;
      //console.log(businessDocument);
    }
  }
  

  async function handleConsultarSociosClick() {
    const checkedPartnerships = partnershipResponse.filter((partnership) => {
      const checkbox = document.getElementById(`checkbox-${partnership.businessDocument}`);
      return checkbox && checkbox.checked;
    });
    if (checkedPartnerships.length === 0) {
      alert('Para usar este recurso, pelo menos um checkbox precisa estar marcado.');
      return;
    }
    const businessDocuments = checkedPartnerships.map((partnership) => partnership.businessDocument);
    for (const businessDocument of businessDocuments) {
      if (businessDocument.length === 11) {
        console.log(`${businessDocument} é um CPF.`);
        const responseSocioPF = await generateReport(businessDocument);
        createPDF(JSON.stringify(responseSocioPF))
        
      } else if (businessDocument.length === 14) {
        console.log(`${businessDocument} é um CNPJ.`);
        const responseSocioPJ = await generateBusinessReport(businessDocument);
        createPDF(JSON.stringify(responseSocioPJ))
      } else {
        console.log(`${businessDocument} não é um CPF nem um CNPJ.`);
      }
    }
  }
  
  const handleBaixarPDFClick = () => {
    console.log('Baixar PDF clicado ', personType);
    if(personType==="PF"){
      console.log('clicado em PF')
      createPDF(JSON.stringify(relatorio));
    } else{
      console.log('clicado em PJ')
      createPDFPJ(JSON.stringify(relatorio));
    }
  }

  const radioOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" }
  ];

  return (
    <FormProvider {...{ control, handleSubmit, register }}>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="formRadioGroup">
          <Form.Label>Tipo de Pessoa</Form.Label><br></br>
          {radioOptions.map((option) => (
            <Form.Check
              key={option.value}
              type="radio"
              label={option.label}
              name="radioGroup"
              value={option.value}
              inline
              {...register("radioGroup")}
            />
          ))}
        </Form.Group><br></br>
        <Row>
          <Col sm={5} className="d-flex justify-content-center align-items-center">
            <Form.Group controlId="formDocumentNumber">
              <Form.Label>Número do Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Document number"
                {...register("documentNumber", { required: true })}
              />
              {errors.documentNumber && <Alert variant="danger">{errors.documentNumber.message}</Alert>}
            </Form.Group>
          </Col>
          <Col sm={5} className="d-flex justify-content-center align-items-center">
            <Form.Group controlId="formIdPipefy">
              <Form.Label>ID Pipefy</Form.Label>
              <Form.Control type="text" placeholder="Id Pipefy" {...register("idPipefy")} />
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Realizar Consulta"}
        </Button>
      </Form>

      {isResultViewVisible && (
        <>
          <hr />
          <h3>Resultados</h3>
          <Row>
            <Col sm={6} className="col mx-auto">
              <h4>Relatório</h4>
              <ul>
                {reports.map((report) => (
                  <li key={report.id}>
                  Nome: {report.registration.consumerName}
                  <br/>
                  Score: {report.score.score}
                </li>
                ))}
              </ul>
            </Col>
            <Col sm={6} className="col mx-auto">
              <h4>Sócios</h4>
              <ul>
                {partnershipResponse.map((partnership) => (
                  <li key={partnership.businessDocument}>
                    {partnership.businessDocument}<br />
                    %: {partnership.participationPercentage}%<br />
                    Status: {partnership.companyStatusCode}<br />
                    <input type="checkbox" id={`checkbox-${partnership.businessDocument}`} value={partnership.businessDocument} onChange={handleCheckboxChange} />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <br />
          <Button variant="secondary" onClick={handleBaixarPDFClick} style={{marginRight: "56px"}}>
            Baixar Relatório PDF
          </Button>
          
          <Button variant="secondary" onClick={handleConsultarSociosClick} className="mr-200">
            Consultar Sócios
          </Button>
        </>
      )}
      
    </FormProvider>
  );
}

function ReportForm() {
  return (
    <Container>
      <article className="contractPage">
        <title>Serasa</title>
        <meta name="description" content="Ofx" />
        <div className="contractPage--header">
          <h1>Aferição de renda</h1>
        </div>
        <hr />
        <div className="ofx">
          <header className="header">
            <h1>Serasa Credit Score</h1>
          </header>
          <main className="main">
            <Row className="justify-content-center">
              <Col md={6} className="col mx-auto">
                <div className="search-form">
                  <h2>Consulte o cliente</h2>
                  <FormComponent />
                </div>
              </Col>
            </Row>
          </main>
          <footer className="footer">
            <Row>
              <Col></Col>
            </Row>
          </footer>
        </div>
      </article>
  </Container>

  );
}

export default ReportForm;
