import HomePage from '../../components/HomePage';
import {useForm, FormProvider} from "react-hook-form";
import Input from "../../components/form/input/Input"
import { Row, Col, Button, Container } from 'react-bootstrap';
import { getToken } from '../../services/gerToken';
import { getByCpf } from '../../services/getByCPF';

const Home = () => {
  const { register, handleSubmit } = useForm();
  //const onSubmit = data => console.log(data);
  const onSubmit = async (data) => {
    const token = await getToken();
    console.log(data.cpfCNPJ)
    const result = await getByCpf(token);
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
  
  