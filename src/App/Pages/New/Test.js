import React, {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {generateBusinessReport, generateReport} from "./service";
import {Alert, Button, Col, Form, FormGroup, Row} from "react-bootstrap";
import Results from "../../Containers/Searches/Result/Results";

// import "styles.scss";

function Input({label, name, type, placeholder, required, register}) {
    return (
        <FormGroup controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} {...register(name, {required})} />
        </FormGroup>
    );
}

const ResultView = ({state, setState}) => {
    console.log({state, setState});
    return (
        <Row className="w-100">
            <Col className="w-100">{state && state.length > 0 && <Results list={state}/>}</Col>
        </Row>
    );
};

const ResultView2 = ({state2, setState2}) => {
    console.log({state2, setState2});
    return (
        <Row className="w-100">
            <Col className="w-100">{state2 && state2.length > 0 && <Results list={state2} pfOuPj="PJ"/>}</Col>
        </Row>
    );
};


function ReportForm() {
    const {control, handleSubmit, register, formState: {errors}} = useForm();
    const [reports, setReports] = useState([]);
    const [partnershipResponse, setPartnershipResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResultViewVisible, setIsResultViewVisible] = useState(false);

    const submitForm = (data) => {
        setIsLoading(true);
        console.log("DATA: ", data);
        const generateReportFunc = data.radioGroup === "PF" ? generateReport : generateBusinessReport;
        generateReportFunc(data.documentNumber).then((response) => {
            setReports(response.reports);
            setPartnershipResponse(data.radioGroup === "PF" ? response.optionalFeatures.partner.partnershipResponse : response.optionalFeatures.partner.PartnerResponse.results);
            setIsLoading(false);
            setIsResultViewVisible(true);
        });
    };

    const handleConsultarSociosClick = () => {
        console.log("Consultar Sócios clicado");
    };

    const handleBaixarPDFClick = () => {
        console.log("Baixar PDF clicado");
    };

    const radioOptions = [
        {label: "PF", value: "PF"},
        {label: "PJ", value: "PJ"}
    ];

    return (
        <FormProvider {...{control, handleSubmit, register}}>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Form.Group controlId="formRadioGroup">
                    <Form.Label>Tipo de Pessoa</Form.Label>
                    {radioOptions.map((option) => (
                        <Form.Check
                            key={option.value}
                            type="radio"
                            label={option.label}
                            name="radioGroup"
                            value={option.value}
                            inline
                            {...register("radioGroup")}
                        />
                    ))}
                </Form.Group>
                <Row>
                    <Col sm={4}>
                        <Form.Group controlId="formDocumentNumber">
                            <Form.Label>Número do Documento</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Document number" {...register("documentNumber", {required: true})} />
                            {errors.documentNumber && <Alert variant="danger">{errors.documentNumber.message}</Alert>}
                        </Form.Group>
                    </Col>
                    <Col sm={5}>
                        <Form.Group controlId="formIdPipefy">
                            <Form.Label>ID Pipefy</Form.Label>
                            <Form.Control type="text" placeholder="Id Pipefy" {...register("idPipefy")} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Carregando..." : "Realizar Consulta"}
                </Button>
            </Form>

            {isResultViewVisible && (
                <>
                    <hr/>
                    <h3>Resultados</h3>
                    <Row>
                        <Col sm={6}>
                            <h4>Relatório</h4>
                            <ul>
                                {reports.map((report) => (
                                    <li key={report.id}>{report.title}</li>
                                ))}
                            </ul>
                        </Col>
                        <Col sm={6}>
                            <h4>Sócios</h4>
                            <ul>
                                {partnershipResponse.map((partner) => (
                                    <li key={partner.id}>{partner.name}</li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                    <br/>
                    <Button variant="secondary" onClick={handleBaixarPDFClick}>Baixar Relatório PDF</Button>
                    <Button variant="secondary" onClick={handleConsultarSociosClick}>Consultar Sócios</Button>
                </>
            )}
        </FormProvider>
    )
}

export default ReportForm;
