import React, { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Report } from "../../../models";
import { Table, Button } from 'react-bootstrap';

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
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Link</th>
                    <th>Status</th>
                    <th>Version</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.link}</td>
                        <td>{report.status}</td>
                        <td>{report._version}</td>
                        <td>
                            <Button onClick={() => downloadFile(report.link)}>Download Report</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListReport;
