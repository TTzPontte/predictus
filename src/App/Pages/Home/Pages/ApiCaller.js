import React, { useEffect, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { DataStore } from "aws-amplify";
import { Report } from "../../../../models";
import { downloadFromS3 } from "../helpers";
import "../styles.scss";

const API_URL = "http://127.0.0.1:8080/hello";

const ApiCaller = ({ selectedFileName }) => {
  const [reportId, setReportId] = useState(null);

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
      body: JSON.stringify({ file_name: fileWithoutExtension, report_id: reportId }),
    };

    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  }, []);

  const subscribeToReport = useCallback(async (fileWithoutExtension) => {
    const subscription = DataStore.observe(Report, reportId).subscribe((msg) => {
      if (msg.model && msg.model.status === "COMPLETE") {
        downloadFile(fileWithoutExtension);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [reportId]);

  const downloadFile = useCallback(async (fileWithoutExtension) => {
    const reportUrl = await downloadFromS3(selectedFileName);
    window.open(reportUrl, "_blank");
  }, [selectedFileName]);

  const handleClick = useCallback(async () => {
    try {
      const newReportId = await saveReportToDatastore();
      setReportId(newReportId);
      const fileWithoutExtension = selectedFileName.slice(0, selectedFileName.lastIndexOf("."));
      await fetchApi(fileWithoutExtension, newReportId);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }, [selectedFileName, saveReportToDatastore, fetchApi]);

  useEffect(() => {
    if (reportId) {
      const fileWithoutExtension = selectedFileName.slice(0, selectedFileName.lastIndexOf("."));
      const cleanupSubscription = subscribeToReport(fileWithoutExtension);
      return () => {
        cleanupSubscription();
      };
    }
  }, [selectedFileName, reportId, subscribeToReport]);

  return (
      <div>
        <Button onClick={handleClick}>Call API</Button>
      </div>
  );
};

export default ApiCaller;
