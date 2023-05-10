import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { generateBusinessReport, generateReport } from "./service";

function FormComponent() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();
  const [reports, setReports] = useState([]);
  const [partnershipResponse, setPartnershipResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultViewVisible, setIsResultViewVisible] = useState(false);

  const submitForm = async (data) => {
    setIsLoading(true);
    const generateReportFunc = data.radioGroup === "PF" ? generateReport : generateBusinessReport;
    const response = await generateReportFunc(data.documentNumber);
    setReports(response.reports);
    setPartnershipResponse(
      data.radioGroup === "PF"
        ? response.optionalFeatures.partner.partnershipResponse
        : response.optionalFeatures.partner.PartnerResponse.results
    );
    setIsLoading(false);
    setIsResultViewVisible(true);
  };

  const handleConsultarSociosClick = () => console.log("Consultar Sócios clicado");
  const handleBaixarPDFClick = () => console.log("Baixar PDF clicado");

  const radioOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" }
  ];

  return (
    <FormProvider {...{ control, handleSubmit, register }}>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="formRadioGroup">
          <Form.Label>Tipo de Pessoa</Form.Label>
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
        </Form.Group>
        <Row>
          <Col sm={4}>
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
          <Col sm={5}>
            <Form.Group controlId="formIdPipefy">
              <Form.Label>ID Pipefy</Form.Label>
              <Form.Control type="text" placeholder="Id Pipefy" {...register("idPipefy")} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Realizar Consulta"}
        </Button>
      </Form>

      {isResultViewVisible && (
        <>
          <hr />
          <h3>Resultados</h3>
          <Row>
            <Col sm={6}>
              <h4>Relatório</h4>
              <ul>
                {reports.map((report) => (
                  <li key={report.id}>{report.title}</li>
                ))}
              </ul>
            </Col>
            <Col sm={6}>
              <h4>Sócios</h4>
              <ul>
                {partnershipResponse.map((partnership) => (
                  <li key={partnership.id}>{partnership.name}</li>
                ))}
              </ul>
            </Col>
          </Row>
          <br />
          <Button variant="secondary" onClick={handleBaixarPDFClick}>
            Baixar Relatório PDF
          </Button>
          <Button variant="secondary" onClick={handleConsultarSociosClick}>
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
              <Col md={6}>
                <div className="search-form">
                  <h2>Check your credit score</h2>
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
