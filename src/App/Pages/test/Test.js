import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generateBusinessReport, generateReport } from "./service";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import Radio from "../../components/Form/Radio";
import Results from "../../Containers/Searches/Result/Results";
import {createPDF, createPDFPJ} from "../../servicer/convertToPDF"



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
  const [state3, setState3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultViewVisible, setIsResultViewVisible] = useState(false);
  const [isResultView2Visible, setIsResultView2Visible] = useState(false);
  const [personType, setPersonType] = useState("");
  
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = methods;

  const onSubmit = (data) => {
    console.log('form: ',data)
    setPersonType(data.radioGroup);
    setIsLoading(true);
    if (data.radioGroup === "PF") {
      generateReport(data.documentNumber).then((response) => {

        setState3(response);
        setState(response.reports);
        setIsResultViewVisible(true)
        try{
          if(response.optionalFeatures.partner.partnershipResponse!==undefined){
            setState2(response.optionalFeatures.partner.partnershipResponse);
            setIsResultView2Visible(true);
          }
        }catch(error){
          console.log('erro: ',error)
        }
        setIsLoading(false);
      }).catch((error) => {
        console.error("Erro ao gerar relatório:", error);
        setIsLoading(false);
        alert(`Erro ao gerar relatório. Tente novamente mais tarde. Detalhes do erro: ${error.message}`);
      });
    } else if (data.radioGroup === "PJ") {
      generateBusinessReport(data.documentNumber).then((response) => {
        setState3(response);
        console.log('json: ', response)
        setState(response.reports);
        setIsResultViewVisible(true)
        setState2(response.optionalFeatures.partner.PartnerResponse.results);
        setIsLoading(false);
        if(response.optionalFeatures.partner.PartnerResponse.results !== undefined){
          setIsResultView2Visible(true);
        }
      }).catch((error) => {
        console.error("Erro ao gerar relatório:", error);
        setIsLoading(false);
        alert(`Erro ao gerar relatório. Tente novamente mais tarde. Detalhes do erro: ${error.message}`);
      });
    }
  }
  
  const handleConsultarSocios = async () => {
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
            console.log('CPF');
            const responseOpcional = await generateReport(documento);
            //console.log(responseOpcional);
            createPDF(JSON.stringify(responseOpcional));
          } else {
            console.log('CNPJ');
            const responseOpcional = await generateBusinessReport(documento);
            //console.log(responseOpcional);
            createPDFPJ(JSON.stringify(responseOpcional));
          }
        } catch (error) {
          console.error('Ocorreu um erro na requisição:', error);
          alert(`Erro ao gerar relatório para: ${documento}. Detalhes do erro: ${error.message}`);
          // Tratar o erro de acordo com a necessidade
        }
      }
    }
  };
  
  const handleBaixarPDF = () => {
    console.log('Baixar PDF clicado ', personType);
    if(personType==="PF"){
      console.log('clicado em PF')
      createPDF(JSON.stringify(state3));
    } else{
      console.log('clicado em PJ')
      createPDFPJ(JSON.stringify(state3));
    }
  }

  const radioOptions = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" }
  ];
  
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
      <ResultView {...{state, setState}}/><br></br>
      {isResultViewVisible ? <button onClick={handleBaixarPDF}>Baixar Relatório PDF</button> : null}<br></br><br></br><br></br>
      {isResultView2Visible ? <ResultView2 {...{state2, setState2}}/> : null}<br></br>
      {isResultView2Visible ? <button onClick={handleConsultarSocios}>Consultar Sócios</button> : null}<br></br><br></br>
    </FormProvider>
  );

}

export default ReportForm;
