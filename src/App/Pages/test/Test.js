import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Form, Col, Row, FormGroup } from 'react-bootstrap';
import Radio from '../../components/Form/Radio';
import Button from "react-bootstrap/Button";




const getEnvironment = () => (window.location.hostname === 'localhost' ? 'dev' : 'prod');

const radioOptions = [
  { label: 'PF', value: 'PF' },
  { label: 'PJ', value: 'PJ' }
];

function ReportForm() {

  const methods = useForm();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  //const [loading, setLoading] = useState(false);
  //const [state, setState] = useState([]);
  //const [personType, setPersonType] = useState("");

  const onSubmit = async (data) => {

    console.log('form: ', data);
    data.documentNumber = data.documentNumber.replace(/\D/g, ''); 

    console.log('documento: ', data.documentNumber)
    const ambiente = getEnvironment();
   
       
  };

  return (
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Radio label="Tipo de Pessoa" name="radioGroup" options={radioOptions} inline control={control} />
          <Row>
            <Col sm={4}>
              <FormGroup controlId="documentNumber">
                <Form.Label>Número do Documento</Form.Label>
                <Form.Control type="text" placeholder="Document number" {...register('documentNumber', { required: true })} />
              </FormGroup>
            </Col>
            <Col sm={5}>
              <FormGroup controlId="idPipefy">
                <Form.Label></Form.Label>
                <Form.Control type="hidden" placeholder="Id Pipefy" {...register('idPipefy')} />
              </FormGroup>
            </Col>
          </Row><br />
          <Button type="submit" color="primary">Realizar Consulta</Button><br />
        </Form>
      </FormProvider>
  );
}

export default ReportForm;
