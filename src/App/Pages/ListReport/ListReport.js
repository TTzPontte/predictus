import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Report } from "../../../models";
import { Table, Button, Container, Col, Row } from "react-bootstrap";
import {Frame514Collection, ItemList} from "../../../ui-components";

const ListReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reportsData = await DataStore.query(Report);
      setReports(reportsData);
    };

    fetchData();

    const subscription = DataStore.observe(Report).subscribe(() => fetchData());
    return () => subscription.unsubscribe();
  }, []);

  const downloadFile = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <ItemList  overrideItems={({ item, index }) => ({

            DownloadButton: <Button onClick={()=>    window.open("https://www.google.com", "_blank")} />
          })} />
        </Col>
      </Row>
    </Container>
  );
};

export default ListReport;
