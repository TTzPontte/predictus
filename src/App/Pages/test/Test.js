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
    console.log('form: ', data);
    //data.documentNumber = data.documentNumber.replace(/\D/g, '');
    const ambiente = getEnvironment();
    console.log({ambiente})
    
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
            <h2>Dados dos Sócios PF</h2>
          </>
        )}

        {/* Campos PF */}
        {(watchRadio === 'PF') && (
          <>
            <h3>Dados Pessoa Física</h3>
            <Row>
              <Col sm={4}>
                <FormGroup controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome"
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
                    placeholder="Digite o número do documento"
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
                    placeholder="Digite o email"
                    {...methods.register('email', { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* Phone number field with mask */}
            <Row>
              <Col sm={4}>
                <FormGroup controlId="phoneNumber">
                  <Form.Label>Número de Telefone</Form.Label>
                  <Controller
                    name="phoneNumber"
                    control={methods.control}
                    render={({ field }) => (
                      <InputMask
                        mask="+99 (99) 999999999"
                        maskChar="_"
                        {...field}
                        placeholder="Digite o número de telefone"
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
            <h3>Dados Sócio PF {index + 1}</h3>
            <Row>
              <Col sm={4}>
                <FormGroup controlId={`socioName${index}`}>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do sócio"
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
                    placeholder="Digite o número do documento do sócio"
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
                    placeholder="Digite o email do sócio"
                    {...methods.register(`socioEmail${index}`, { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* Phone number field with mask */}
            <Row>
              <Col sm={4}>
                <FormGroup controlId={`socioPhoneNumber${index}`}>
                  <Form.Label>Número de Telefone</Form.Label>
                  <Controller
                    name={`socioPhoneNumber${index}`}
                    control={methods.control}
                    render={({ field }) => (
                      <InputMask
                        mask="+99 (99) 999999999"
                        maskChar="_"
                        {...field}
                        placeholder="Digite o número de telefone do sócio"
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
