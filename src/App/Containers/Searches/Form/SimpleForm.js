import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import data from "../Result/response.json";
import React from "react";
const payload = (i = {}) => {
  const { movimentos, assuntosCNJ, classeProcessual = {} } = i;
  return {
    ...i,
    area: i?.area || " - ",
    valorCausa: `${i?.valorCausa?.moeda || "R$"} ${i?.valorCausa?.valor || "00.00"}`,
    // partes: partes.map((i) => ({
    //   ...i,
    //   advogados_nome: i.nome,
    //   advogados_oab: i.oab,
    //   advogago_cpf: i.cpf,
    //   advogago_tipo: i.tipo
    // })),
    eProcessoDigital: String(i?.eProcessoDigital),
    movimentos: movimentos.map((j) => ({
      ...j,
      nomeOriginal: j.nomeOriginal[0],
      eMovimento: String(j.eMovimento),
      data: new Date(j.data).toLocaleDateString()
    })),
    assuntosCNJ: assuntosCNJ.map((j) => ({ codigoCNJ: j?.codigoCNJ || " - ", titulo: j?.titulo || " - " })),
    classeProcessual: [classeProcessual].map((j) => {
      const x = { codigoCNJ: j?.codigoCNJ || " - ", nome: j?.nome || " - " };
      console.log({ x });
      return x;
    })
  };
};

const SimpleForm = ({ state, setState, children }) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = ({ data }) => {
    let dataValues = [];
    for (let i in data) {
      const item = data[i];
      const values = payload(item);

      dataValues.push(values);
    }
    // const response = await getLambda();
    // await setState(response);
    setState({ data: dataValues });
  };
  return (
    <>
      <FormProvider {...methods}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              {children}</Col>
            <Col>
              {/*<Button type={"submit"} variant={"primary"}>*/}
              <Button onClick={() => onSubmit(data)} variant={"primary"}>
                {" "}
                Submit{" "}
              </Button>
            </Col>
          </Row>
        </form>
      </FormProvider>
    </>
  );
};
export default SimpleForm;
