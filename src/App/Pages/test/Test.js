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

const ResultView2 = ({state2, setState2})=>{
  console.log({state2, setState2})
  return (
      <Row className="w-100">
        <Col className="w-100">
          {state2 && state2.length > 0 && <Results list={state2} pfOuPj="PJ" />}
        </Col>
      </Row>
  )
}

function ReportForm() {
  const methods = useForm();
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultView2Visible, setIsResultView2Visible] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = methods;

  const onSubmit = (data) => {
    setIsLoading(true); // Ativa a tela de carregamento
    console.log('DATA: ', data)
    if (data.radioGroup === "PF") {
      generateReport(data.documentNumber).then((response) => {
        setState(response.reports);
        setState2(response.optionalFeatures.partner.partnershipResponse);
        setIsLoading(false); // Desativa a tela de carregamento
        setIsResultView2Visible(true); // Exibe a tabela ResultView2
      });
    } else if (data.radioGroup === "PJ") {
      generateBusinessReport(data.documentNumber).then((response) => {
        setState(response.reports);
        setState2(response.optionalFeatures.partner.PartnerResponse.results);
        setIsLoading(false); // Desativa a tela de carregamento
        setIsResultView2Visible(true); // Exibe a tabela ResultView2
      });
    }
  }
  
  const handleConsultarSocios = () => {
    console.log('Consultar Sócios clicado');
  }

  const handleBaixarPDF = () => {
    console.log('Baixar PDF clicado');
  }

  const radioOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" }
  ];

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Radio label="Tipo de Pessoa" name="radioGroup" options={radioOptions} inline control={control} />
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
      <ResultView {...{state, setState}}/><br></br>
      {isResultView2Visible ? <button onClick={handleBaixarPDF}>Baixar Relatório PDF</button> : null}<br></br><br></br><br></br>
      {isResultView2Visible ? <ResultView2 {...{state2, setState2}}/> : null}<br></br>
      {isResultView2Visible ? <button onClick={handleConsultarSocios}>Consultar Sócios</button> : null}<br></br><br></br>
    </FormProvider>
  );
}

export default ReportForm;
