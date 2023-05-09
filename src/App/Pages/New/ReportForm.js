import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
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

  const submitForm = (data) => {
    setIsLoading(true);
    console.log("DATA: ", data);
    const generateReportFunc = data.radioGroup === "PF" ? generateReport : generateBusinessReport;
    generateReportFunc(data.documentNumber).then((response) => {
      setReports(response.reports);
      setPartnershipResponse(
        data.radioGroup === "PF"
          ? response.optionalFeatures.partner.partnershipResponse
          : response.optionalFeatures.partner.PartnerResponse.results
      );
      setIsLoading(false);
      setIsResultViewVisible(true);
    });
  };

  const handleConsultarSociosClick = () => {
    console.log("Consultar Sócios clicado");
  };

  const handleBaixarPDFClick = () => {
    console.log("Baixar PDF clicado");
  };

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
          {isLoading ? "Carregando..." : "Realizar Consulta"}
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Serasa Credit Score</h1>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="search-form">
                <h2>Check your credit score</h2>
                <FormComponent />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <Row>
            <Col>
              <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  );
}

export default ReportForm;
