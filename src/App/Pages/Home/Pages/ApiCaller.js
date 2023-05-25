import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { DataStore } from "aws-amplify";
import { Report } from "../../../../models";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.scss";

const API_URL = "https://75sh91wz4i.execute-api.us-east-1.amazonaws.com/Prod/hello/";
// const API_URL = "http://127.0.0.1:8080/hello/";

const ApiCaller = ({ selectedFileName }) => {
    const [reportId, setReportId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [reportUrl, setReportUrl] = useState(null);

    const saveReportToDatastore = useCallback(async (fileName) => {
        const report = await DataStore.save(new Report({
            status: "PENDING",
            fileName: fileName,
        }));
        return report.id;
    }, []);

    const fetchApi = useCallback((fileWithoutExtension, reportId) => {
        const options = {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file_name: fileWithoutExtension, report_id: reportId }),
        };

        fetch(API_URL, options)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const downloadFile = useCallback(() => {
        if (reportUrl) {
            window.open(reportUrl, "_blank");
        }
    }, [reportUrl]);

    const subscribeToReport = useCallback((fileWithoutExtension) => {
        const subscription = DataStore.observe(Report, reportId).subscribe({
            next: (msg) => {
                console.log({ msg });
                if (msg.model && msg.savedElement.status === "COMPLETED") {
                    toast.success("Report successfully Created")
                    setReportUrl(msg.savedElement.link);
                    setLoading(false);
                }
                if (msg.model && msg.savedElement.status === "ERROR") {
                    toast.error("An error occurred while generating the report.");
                    setLoading(false);
                    setError(true);
                }
            },
            error: (error) => {
                console.error(error);
            },
        });

        return () => subscription.unsubscribe();
    }, [reportId]);

    const handleClick = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {
            const newReportId = await saveReportToDatastore(selectedFileName);
            setReportId(newReportId);

            const fileWithoutExtension = selectedFileName.slice(0, selectedFileName.lastIndexOf("."));
            fetchApi(fileWithoutExtension, newReportId);
        } catch (error) {
            console.error("Error calling API:", error);
            setLoading(false);
            setError(true);
            toast.error("An error occurred while generating the report.");
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
                <Button onClick={handleClick} disabled={loading || reportUrl}>
                    {loading ? <Spinner animation="border" color="white" size="md" /> : "Gerar Relatório"}
                </Button>
                <Button onClick={downloadFile} disabled={!reportUrl}>
                    Baixar Relatório
                </Button>
                {loading && <p>Loading...</p>}
                {error && <p>An error occurred while generating the report.</p>}
                <ToastContainer />
            </Col>
        </Row>
    );
};

export default ApiCaller;
