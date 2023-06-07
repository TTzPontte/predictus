import React, {useState} from "react";
import PropTypes from "prop-types";
import {Row, Spinner} from "react-bootstrap";
import {StorageManager} from '@aws-amplify/ui-react-storage';
import { Auth, Hub } from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';
import Button from "react-bootstrap/Button"; // npm install aws-sdk
const NewButton = () => {
    const hadleClick = () => {

        Auth.currentCredentials()
            .then(credentials => {
                const lambda = new Lambda({
                    credentials: Auth.essentialCredentials(credentials)
                });
                return lambda.invoke({
                    FunctionName: 'ocr',
                    Payload: JSON.stringify({hello: "world"}),
                });
            })
    }
    return <Button onClick={hadleClick}></Button>
}


const FirstPage = ({handleUpload}) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const renderSubmitButton = () => {
        return (
            !submitted && (
                <button type="submit" id="file-upload-btn" className="btn btn-primary">
                    {loading ? <Spinner animation="border" color={'white'} size="md"/> : "Submit"}
                </button>
            )
        );
    };

    return (
        <section className="ofx2">
                    <Row><NewButton>taggg</NewButton></Row>
            <div className="uploader">
                <div className="card">
                    <Row>
                        <form id="file-upload-form" onSubmit={handleUpload}>
                            <StorageManager
                                acceptedFileTypes={['application/pdf']}
                                accessLevel="public"
                                maxFileCount={1}
                                onUploadStart={() => setLoading(true)}
                                onUploadSuccess={() => setSubmitted(true)}
                                onUploadError={() => setLoading(false)}
                                components={{
                                    FilePicker: ({onClick}) => (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={onClick}
                                            disabled={loading || submitted}
                                        >
                                            {loading ? <Spinner animation="border" color="white" size="md"/> : "Submit"}
                                        </button>
                                    ),
                                }}
                            />
                            <div>{renderSubmitButton()}</div>
                        </form>
                        {submitted && <p>Form submitted successfully!</p>}
                    </Row>
                </div>
            </div>
        </section>
    );
};

FirstPage.propTypes = {
    handleUpload: PropTypes.func,
};

export default FirstPage;
