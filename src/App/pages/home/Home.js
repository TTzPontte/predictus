import { useState } from 'react';
import {useForm, FormProvider} from "react-hook-form";
import Input from "../../components/form/input/Input"
import { Row, Col, Button, Container } from 'react-bootstrap';
import { getToken } from '../../services/gerToken';
import { getByCpf } from '../../services/getByCPF';
import { getByCNPJ } from '../../services/getByCNPJ';
import { getPJInfo } from '../../services/getPJInfo';
import generateTableDataPJ from '../../services/generateTableDataPJ';
import generateTableDataPF from '../../services/generateTableDataPF';

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState(null);
  const [tableDataPF, setTableDataPF] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);

  async function downloadResult(result) {
    const nomeConsulta = result.reports[0].registration.consumerName;
    const blob = new Blob([JSON.stringify(result)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    setDownloadLink({ url, name: nomeConsulta });
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

    const tableDataPF = generateTableDataPF(result);
    setTableDataPF(tableDataPF);

    const tableData = generateTableDataPJ(pjInfo);
    setTableData(tableData); //

    
    var resultPJ = await getByCNPJ(token, data.cpfCNPJ);
    resultPJ = await getByCNPJ(token, data.cpfCNPJ);
    console.log(resultPJ);
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
      {downloadLink && (
        <p>
          <a href={downloadLink.url} download={`${downloadLink.name}.json`}>Clique aqui</a> para baixar o documento.
        </p>
      )}
      <br></br>
      <br></br>
      <br></br>
      {tableDataPF}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {tableData} {/* adicionando a tabela no retorno do componente */}

    </Container>
    

    );
  };

  export default Home;
  
  