import { useState } from 'react';
import {useForm, FormProvider} from "react-hook-form";
import Input from "../../components/form/input/Input"
import { Row, Col, Button, Container } from 'react-bootstrap';
import { getToken } from '../../services/gerToken';
import { getByCpf } from '../../services/getByCPF';
import { getByCNPJ } from '../../services/getByCNPJ';
import { getPJInfo } from '../../services/getPJInfo';

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState(null);

  
  async function downloadResult(result) {
    const nomeConsulta = result.reports[0].registration.consumerName;
    const blob = new Blob([JSON.stringify(result)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeConsulta + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const onSubmit = async (data) => {
    if (!token) {
      setToken(await getToken());
    }

    const result = await getByCpf(token, data.cpfCNPJ);
    console.log(result);

    const pjInfo = await getPJInfo(result)
    console.log('Infos: \n', pjInfo)

    await downloadResult(result);
  };
  

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
  
  