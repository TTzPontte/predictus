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
          <ReportCreateForm
            onSubmit={(fields) => {
                // Example function to trim all string inputs
                const updatedFields = {}
                Object.keys(fields).forEach(key => {
                    if (typeof fields[key] === 'string') {
                        updatedFields[key] = fields[key].trim()
                    } else {
                        updatedFields[key] = fields[key]
                    }
                })
                return updatedFields
            }}
          />
          </Card.Body>
        </Card>

        <ResultView results={results} />
      </Container>
  );
}

export default ReportForm;
