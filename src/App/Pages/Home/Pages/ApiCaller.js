import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { DataStore } from "aws-amplify";
import { Report } from "../../../../models";
import "../styles.scss";

const API_URL = "https://75sh91wz4i.execute-api.us-east-1.amazonaws.com/Prod/hello/";
// const API_URL = "http://127.0.0.1:8080/hello/";

const ApiCaller = ({ selectedFileName }) => {
  const [reportId, setReportId] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveReportToDatastore = useCallback(async (fileName) => {
    const report = await DataStore.save(
        new Report({
          status: "PENDING",
          fileName: fileName,
        })
    );
    return report.id;
  }, []);

  const fetchApi = useCallback(async (fileWithoutExtension, reportId) => {
    const options = {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_name: fileWithoutExtension, report_id: reportId }),
    };

    fetch(API_URL, options)
        .then((r) => console.log(r))
        .catch((e) => console.log(e));
  }, []);

  const downloadFile = useCallback(
      async (reportUrl) => {
        // const reportUrl = await downloadFromS3(fileWithoutExtension);
        window.open(reportUrl, "_blank");
        setLoading(false);
      },
      []
  );

  const subscribeToReport = useCallback(
      (fileWithoutExtension) => {
        const subscription = DataStore.observe(Report, reportId).subscribe({
          next: (msg) => {
            console.log({ msg });
            if (msg.model && msg.savedElement.status === "COMPLETED") {
              downloadFile(msg.savedElement.link);
            }
          },
          error: (error) => console.error(error),
        });

        return () => subscription.unsubscribe();
      },
      [reportId, downloadFile]
  );

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const newReportId = await saveReportToDatastore(selectedFileName);
      setReportId(newReportId);
      const fileWithoutExtension = selectedFileName.slice(0, selectedFileName.lastIndexOf("."));
      await fetchApi(fileWithoutExtension, newReportId);
    } catch (error) {
      console.error("Error calling API:", error);
      setLoading(false);
    }
  }, [selectedFileName, saveReportToDatastore, fetchApi]);

  useEffect(() => {
    if (reportId) {
      const fileWithoutExtension = selectedFileName.slice(0, selectedFileName.lastIndexOf("."));
      return subscribeToReport(fileWithoutExtension);
    }
  }, [selectedFileName, reportId, subscribeToReport]);

  return (
      <Row>
        <Col>
          <Button onClick={handleClick}>
            {loading ? <Spinner animation="border" color={"white"} size="md" /> : "Gerar Relatório"}
          </Button>
        </Col>
      </Row>
  );
};

export default ApiCaller;
