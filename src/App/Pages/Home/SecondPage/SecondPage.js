import React from "react";
import PropTypes from "prop-types";
import BankTable from "./tables/BankTable";
import Tables from "./tables/tables";
import { Header, TRow } from "../../../components/Table/Table";
import Panel from "./tables/primary-table/panel";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Section from "../../../components/Form/Section";

const months = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro"
};
const Section1 = ({ selectedFile = {} }) => {
  const refreshPage = () => {
    window.location.reload(false);
  };
  const downloadReport = () => {
    window.open(
      "https://ocr-document-storage.s3.us-east-1.amazonaws.com/expense_report.xlsx?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJIMEYCIQD4LOvTl3pQrSpI7Fj0WVnEHtz2Ro92JqtG%2Fhml9AdhnAIhALVmyzY%2FjAR4sjWptcTug7hsoMZHo5eh7NrfH6KuhIsuKvsCCBgQAhoMODQ4NjM4NDI2NTg3IgzGafy9JTXwoiatZYwq2AIDC1kOs0thxOh6SO83XjrfWlCc%2FfS7Dbr73J5Bk6g5H3i1wEurh%2B6wes1Au4rFq4Xo8CkFidhikYp1sWB00xgKDqg6NY1oF0vEbWVhzn4wNU5d%2BzGqhR8xcaSgse%2B6eujAs9UrESUcWQac8LjAYuWaNu4mFQYN21mrQYfhCn54DOw9pb4PvElvxFQJThfSyZ4DvXp8fEXvLq7X%2BvopiDzxxLHxQXetLc3TS3bCbvwCRSZ9krXNq4%2FjxCYZOiM2jrDoPImG0Orda01mIaQ8CV4z6kFErcCIelw5ffOKBgWfe1VWkzMPqnLkT4n3vopeub14hVQ9oRmqjl5l8cRbH6LIKPGS5vM3UC0UD2uZyxb30kloeogylhFnUT5gX8wnz9hkSm5B4LpAqyKVw24TQ1yXdFSpaRvZn7VR1tKR74uy1ACBS3YnauV%2BitkUxbP7G%2BSbJWZwnP%2BzFTCikdSiBjqyAg%2FxpLM1P68ZTFI4aR9sVk5t5Ta3YfUMZpao8br7S9JmalASuxhXa67gbSeqsIn1BG6%2Faqj37GTFvK3fymjfTjoY5fLgJhfz%2BZgwPAMCbR9qJg93TIPVGkmptfi6Qn31HloZMWlQOnN4GP8zaOlo6HPHDWnvSjXoHw%2FWri4d%2F63GOGmiIA8%2FVBm7IvMjIrq9V3jt6nzaBptxQd9CdO1FS9IoK9TM3wMOJ6Xme7id1HAO4iGy%2BvQBagJfgqeq7w1N3IfEdhcriq4rACjKDOtJCqWJpU7UNy0GuOblVqbY%2Fvw4%2F%2FrcWK6XIwyvZHl6u6XhjLvFMpvYUriRowVmm5pcd%2BToxdGFAlzmq2r%2FCQZbuWigEivyOCx%2Fh0HERxQXyIbRQyZitX%2BavZZDMRfyItKxS0RnjA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230505T162452Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA4LFWKXXNT3ERK4WP%2F20230505%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e6f4bcec02ce3824b0f089f8aea7f3ba648c3d7a9e631e81bd7a91445a0c61f7",
      "_blank"
    );
  };

  return (
    <Row
      className={"d-flex my-3 align-items-sm-end justify-content-end"}
      style={{ display: "flex", flex: "1", flexFlow: "row nowrap" }}
    >
      <Col
        className={"d-flex my-3 align-items-sm-end justify-content-start"}
        style={{ display: "flex", flex: "1" }}
      >
        <Button type="button" className="btn btn__less-radius" onClick={refreshPage}>
          Voltar
        </Button>
      </Col>
      <Col
        className={"d-flex my-3 align-items-sm-end justify-content-end"}
        style={{ display: "flex", flex: "1" }}
      >
        <Button type="button" className="btn btn__less-radius" onClick={downloadReport}>
          Baixar Excel
        </Button>
      </Col>
    </Row>
  );
};

const SecondPage = ({ selectedFile = {} }) => {
  const getMonth = (month) => months[month];

  const { statement } = selectedFile;
  const monthlyTransactions = statement?.monthlyTransactions;

  return (
      <Row>
        <Col>
          <Section1 />
          <Row>
            <BankTable bank={selectedFile.bank} statement={statement} />
          </Row>
          <div className="statement-table">
            <Panel title="Statement">
              <table className="table-wrapper">
                <thead className="table-content">
                <tr>
                  <th>Descrição da Transação</th>
                  <th>Créditos</th>
                  <th>Débitos</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(monthlyTransactions).map((key) => (
                    <Tables key={key} {...monthlyTransactions[key]} title={getMonth(key)} active={false} />
                ))}
                </tbody>
              </table>
            </Panel>
          </div>
        </Col>
      </Row>
  );
};


export default SecondPage;
SecondPage.propTypes = {
  selectedFile: PropTypes.object
};
