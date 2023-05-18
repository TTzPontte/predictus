import React, {useCallback, useEffect, useState} from "react";
import {Button, Spinner} from "react-bootstrap";
import {DataStore} from "aws-amplify";
import {Report} from "../../../../models";
import {downloadFromS3} from "../helpers";
import "../styles.scss";

const API_URL = "https://75sh91wz4i.execute-api.us-east-1.amazonaws.com/Prod/hello/";

const ApiCaller = ({ selectedFileName }) => {
  const [reportId, setReportId] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveReportToDatastore = useCallback(async () => {
    const report = await DataStore.save(
        new Report({
          status: "PENDING",
        })
    );
    return report.id;
  }, []);

  const fetchApi = useCallback(async (fileWithoutExtension, reportId) => {
    const options = {
      method: "POST",
      mode: "no-cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_name: fileWithoutExtension, report_id: reportId }),
    };

    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  }, []);

  const downloadFile = useCallback(async (fileWithoutExtension) => {
    const reportUrl = await downloadFromS3(fileWithoutExtension);
    window.open(reportUrl, "_blank");
    setLoading(false);
  }, []);

  const subscribeToReport = useCallback((fileWithoutExtension) => {
    const subscription = DataStore.observe(Report, reportId).subscribe({
      next: (msg) => {
        if (msg.model && msg.model.status === "COMPLETE") {
          downloadFile(fileWithoutExtension);
        }
      },
      error: (error) => console.error(error),
    });

    return () => subscription.unsubscribe();
  }, [reportId, downloadFile]);

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const newReportId = await saveReportToDatastore();
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
      <div>
        <Button onClick={handleClick}>Call API</Button>
        {loading && <Spinner animation="border" />}
      </div>
  );
};

export default ApiCaller;
