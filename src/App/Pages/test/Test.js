import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider, useWatch } from 'react-hook-form';
import { Form, Col, Row, FormGroup } from 'react-bootstrap';
import Radio from '../../components/Form/Radio';
import Button from "react-bootstrap/Button";
import InputMask from 'react-input-mask';

const getEnvironment = () => (window.location.hostname === 'localhost' ? 'dev' : 'prod');

const radioOptions = [
  { label: 'PF', value: 'PF' },
  { label: 'PJ', value: 'PJ' }
];

function ReportForm() {
  const methods = useForm();
  const watchRadio = useWatch({ control: methods.control, name: 'radioGroup' });
  const [showRazaoSocial, setShowRazaoSocial] = useState(false);
  const [showNomeFantasia, setShowNomeFantasia] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [numberOfSocios, setNumberOfSocios] = useState(1);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = async (data) => {
    // Extrair campos do objeto data
    const {
      radioGroup,
      razaoSocial,
      nomeFantasia,
      name,
      documentNumber,
      email,
      phoneNumber,
      ...socios
    } = data;
  
    // Função auxiliar para formatar o número de telefone do sócio
    const formatPhoneNumber = (phoneNumber) => {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      const phoneMatches = cleanedPhoneNumber.match(/(\d{2})(\d{2})(\d+)/);
      const international_dial_code = phoneMatches[1];
      const area_code = phoneMatches[2];
      const number = phoneMatches[3];
      const type = "residential";
      return { international_dial_code, area_code, number, type };
    };

    // Função auxiliar para criar JSON de sócio
    const formattedSocios = Object.entries(socios).reduce((acc, [key, value]) => {
      const index = key.match(/\d+/)[0];
      const field = key.match(/[a-zA-Z]+/)[0];
      const newField =
        field === 'socioName' ? 'name' :
        field === 'socioDocumentNumber' ? 'documentNumber' :
        field === 'socioEmail' ? 'email' :
        field === 'socioPhoneNumber' ? 'phones' : field;
  
      if (!acc[index]) acc[index] = {};
      acc[index][newField] = field === 'socioPhoneNumber' ? formatPhoneNumber(value) : value;
      return acc;
    }, {});
  
    // Montar o payload final
    if (radioGroup === "PF") {
      
      // Extrair o código internacional, código de área e número do phoneNumber
      const phoneNumberMatches = phoneNumber.match(/\+(\d+)\s?\((\d+)\)\s?(\d+)/);
      const internationalDialCode = phoneNumberMatches[1];
      const areaCode = phoneNumberMatches[2];
      const number = phoneNumberMatches[3];

      const payload = {
        id: "123456789",
        tipoPessoa: radioGroup,
        name,
        credit_request_date: new Date().toISOString(),
        documentNumber,
        email,
        phones: [
          {
            international_dial_code: internationalDialCode,
            area_code: areaCode,
            number,
            type: "residential",
          },
        ],
      };
  
      console.log('Payload PF: ', payload);
    } else if (radioGroup === "PJ") {
      const payload = {
        id: "123456789", // Este valor precisa ser definido conforme necessário
        razaoSocial,
        tipoPessoa: radioGroup,
        nomeFantasia,
        credit_request_date: new Date().toISOString(), // Define a data e hora atual
        socios: formattedSocios,

      };
  
      console.log('Payload PJ: ', payload);
    }

  };

  const handleRadioChange = (e) => {
    if (e === 'PF') {
      setShowRazaoSocial(false);
      setShowNomeFantasia(false);
    } else if (e === 'PJ') {
      setShowRazaoSocial(true);
      setShowNomeFantasia(true);
    }

    setShowAdditionalFields(e === 'PJ');
  };

  const handleAddSocio = () => {
    setNumberOfSocios(numberOfSocios + 1);
  };

  const handleRemoveSocio = (index) => {
    setNumberOfSocios(numberOfSocios - 1);
    methods.setValue(`socioName${index}`, '');
    methods.setValue(`socioDocumentNumber${index}`, '');
    methods.setValue(`socioEmail${index}`, '');
    methods.setValue(`socioPhoneNumber${index}`, '');
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Campo de seleção "PF" ou "PJ" */}
        <FormGroup controlId="radioGroup">
          <Form.Label>Tipo de Pessoa</Form.Label><br />
          <Controller
            name="radioGroup"
            control={control}
            render={({ field }) => (
              <>
                {radioOptions.map((option) => (
                  <Form.Check
                    key={option.value}
                    type="radio"
                    inline
                    label={option.label}
                    value={option.value}
                    {...field}
                    checked={field.value === option.value}
                    onChange={() => {
                      field.onChange(option.value);
                      handleRadioChange(option.value);
                    }}
                  />
                ))}
              </>
            )}
          />
        </FormGroup>
        <br />
        {/* Razão Social and Nome Fantasia for PJ */}
        {showRazaoSocial && showNomeFantasia && (
          <>
            <h2>Dados da empresa</h2>
            <Row>
              <Col sm={4}>
                <FormGroup controlId="razaoSocial">
                  <Form.Label>Razão Social</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite a Razão Social"
                    {...methods.register('razaoSocial', { required: true })}
                  />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup controlId="nomeFantasia">
                  <Form.Label>Nome Fantasia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o Nome Fantasia"
                    {...methods.register('nomeFantasia', { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <br />
            <h2>Dados dos Sócios</h2>
          </>
        )}

        {/* Campos PF */}
        {(watchRadio === 'PF') && (
          <>
            <h2>Dados Pessoa Física</h2>
            <Row>
              <Col sm={4}>
                <FormGroup controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: João da Silva"
                    {...methods.register('name', { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <FormGroup controlId="documentNumber">
                  <Form.Label>Número do Documento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: 000.000.000-00"
                    {...methods.register('documentNumber', { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <FormGroup controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ex: email@gmail.com"
                    {...methods.register('email', { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <FormGroup controlId="phoneNumber">
                  <Form.Label>Número de Telefone</Form.Label>
                  <Controller
                    name="phoneNumber"
                    control={methods.control}
                    render={({ field }) => (
                      <InputMask
                        mask="+55 (99) 999999999"
                        maskChar="_"
                        {...field}
                        placeholder="Ex: +55 (00) 000000000"
                        className="form-control"
                        required
                      />
                    )}
                  />
                </FormGroup>
              </Col>
            </Row>
          </>
        )}

        {/* Campos adicionais de sócio */}
        {watchRadio === 'PJ' && Array.from({ length: numberOfSocios }).map((_, index) => (
          <React.Fragment key={index}>
            <br /><h3>Sócio {index + 1}</h3>
            <Row>
              <Col sm={4}>
                <FormGroup controlId={`socioName${index}`}>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: João SIlva"
                    {...methods.register(`socioName${index}`, { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <FormGroup controlId={`socioDocumentNumber${index}`}>
                  <Form.Label>Número do Documento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: 000.000.000-00"
                    {...methods.register(`socioDocumentNumber${index}`, { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <FormGroup controlId={`socioEmail${index}`}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@gmail.com"
                    {...methods.register(`socioEmail${index}`, { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <FormGroup controlId={`socioPhoneNumber${index}`}>
                  <Form.Label>Número de Telefone</Form.Label>
                  <Controller
                    name={`socioPhoneNumber${index}`}
                    control={methods.control}
                    render={({ field }) => (
                      <InputMask
                        mask="+55 (99) 999999999"
                        maskChar="_"
                        {...field}
                        placeholder="Ex: +55 (00) 000000000"
                        className="form-control"
                        required
                      />
                    )}
                  />
                </FormGroup>
              </Col>
              <Col sm={2}>
                {index > 0 && (
                  <Button variant="link" onClick={() => handleRemoveSocio(index)}>Remover</Button>
                )}
              </Col>
            </Row>
          </React.Fragment>
        ))}
        
        {/* Botão para adicionar novo sócio */}
        {watchRadio === 'PJ' && (
          <Button variant="link" onClick={handleAddSocio}>Adicionar novo sócio</Button>
        )}

        <br />
        <Button type="submit" color="primary">
          Realizar Consulta
        </Button>
        <br />
      </Form>
    </FormProvider>
  );
}

export default ReportForm;
