import HomePage from '../../components/HomePage';
import {useForm, FormProvider} from "react-hook-form";
import Input from "../../components/form/input/Input"
import { Row, Col, Button, Container } from 'react-bootstrap';

async function gerarToken() {
  const url = "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login";

  const payload = {};
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==',
    'Cookie': 'SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  const token = data.accessToken;
  console.log(`Token gerado com sucesso!\n${token}\n\n\n`);
  return token;
}

async function gerarRelatorio() {
  const url = "https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport";

  const payload = {
    documentNumber: "00065943600",
    reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
    optionalFeatures: []
  };
  const headers = {
    'Content-Type': 'Application/json',
    'Authorization': 'Bearer ' + await gerarToken(),
    'Cookie': 'SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  console.log(data);
}

const Home = () => {
  const { register, handleSubmit } = useForm();
  //const onSubmit = data => console.log(data);
  const onSubmit = async (data) => {
    //const API = new SerasaExperianApi()
    console.log(data.cpfCNPJ)
    const result = await gerarRelatorio();
    console.log(result)
  }

  return (


    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row><label htmlFor="cpfCNPJ">Adicione aqui o número CPF ou CNPJ</label></Row>
        <input {...register("cpfCNPJ", { 
          required: true, 
          maxLength: 20,
          pattern: /^(?:\d{11}|\d{14})$/ // regex para validar CPF ou CNPJ
        })} />
        <input type="submit" />
      </form>
    </Container>
    

    );
  };

  export default Home;
  
  