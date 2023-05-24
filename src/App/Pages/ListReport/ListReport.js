import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Report } from "../../../models";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ItemList } from "../../../ui-components";
import { downloadFromS3 } from "../Home/helpers";

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

  const downloadFile = async (fileName) => {
    const reportUrlLink = await downloadFromS3(fileName);
    window.open(reportUrlLink, "_blank");
    // setLoading(false);
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <ItemList
            DownLoadButton={() => <h1>hello</h1>}
            overrideItems={({ item, index }) => {
              console.log({ item });
              return {
                DownLoadButton: <Button onClick={() => downloadFile(item.fileName)}>Download xlsx</Button>
              };
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ListReport;
