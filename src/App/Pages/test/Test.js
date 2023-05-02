import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generateBusinessReport, generateReport } from "./service";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import Radio from "../../components/Form/Radio";
import Results from "../../Containers/Searches/Result/Results";

function Input({ label, name, type, placeholder, required, register }) {
  return (
    <FormGroup controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} {...register(name, { required })} />
    </FormGroup>
  );
}

const ResultView = ({state, setState})=>{
  console.log({state, setState})
  return (
      <Row className="w-100">
        <Col className="w-100">
          {state && state.length > 0 && <Results list={state} />}
        </Col>
      </Row>
  )
}
function ReportForm() {
  const methods = useForm();
  const [state, setState] = useState([]);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = methods;

  const onSubmit = (data) => {
    if (data.radioGroup === "PF") {
      generateReport().then((response) => setState(response.reports));
    } else if (data.radioGroup === "PJ") {
      generateBusinessReport().then((response) => setState(response));
    }
  };

  const radioOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" }
  ];

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Radio label="Radio group" name="radioGroup" options={radioOptions} inline control={control} />
        <Row>
          <Col sm={4}>
            <Input
              type="text"
              label="Document number"
              name="documentNumber"
              placeholder="Document number"
              register={register}
              required
            />
          </Col>
        </Row>
        {errors.documentNumber && <span>{errors.documentNumber.message}</span>}
        <input type="submit" />
      </Form>
       <ResultView {...{state, setState}}/>
    </FormProvider>
  );
}

export default ReportForm;
