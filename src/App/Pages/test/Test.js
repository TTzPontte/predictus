import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generateBusinessReport, generateReport } from "./service";
import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import Results from "../../Containers/Searches/Result/Results";
import { ReportCreateForm } from "../../../ui-components";

const ResultView = ({ results }) => (
    <Card className="my-4">
      <Card.Body>
        <Row className="w-100">
          <Col className="w-100">{Array.isArray(results) && results.length > 0 && <Results list={results} />}</Col>
        </Row>
      </Card.Body>
    </Card>
);

const reportTypes = {
  "PF": generateReport,
  "PJ": generateBusinessReport
};

function ReportForm() {
  const methods = useForm();
  const [results, setResults] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = (data) => {
    const generateReportFn = reportTypes[data.radioGroup];
    generateReportFn && generateReportFn().then((response) => setResults(response.reports || response));
  };

  const radioOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" }
  ];

  return (
      <Container className="my-4">
        <Card>
          <Card.Body>
            <FormProvider {...methods}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <ReportCreateForm onSubmit={handleSubmit}>
                  <ReportCreateForm.Field
                      label="Select report type"
                      name="radioGroup"
                      control={control}
                      options={radioOptions}
                      inline
                  />
                  <ReportCreateForm.Field
                      label="Document number"
                      name="documentNumber"
                      control={control}
                      placeholder="Enter document number"
                      rules={{ required: true }}
                  />

                  {errors.documentNumber && (
                      <p className="text-danger font-weight-bold">{errors.documentNumber.message}</p>
                  )}
                  <Button type="submit" className="mt-3">
                    Generate Report
                  </Button>
                </ReportCreateForm>
              </Form>
            </FormProvider>
          </Card.Body>
        </Card>

        <ResultView results={results} />
      </Container>
  );
}

export default ReportForm;
