import { createPDF, createPDFPJ } from "../../servicer/convertToPDF";

export const handlePDFCreation = (personType, responseSerasa) => {
    const reportData = JSON.stringify(responseSerasa);
    personType === "PF" ? createPDF(reportData) : createPDFPJ(reportData);
};

export const handleCheckboxSelection = async (
    checkboxes,
    getPayload,
    invokeLambda
) => {
    const functionName = "ApiSerasa-serasa";

    for (const checkbox of checkboxes) {
        const status = checkbox.checked;
        const row = checkbox.closest("tr");
        const documento = row.querySelector("td:first-child").textContent;

        if (status === true) {
            console.log(documento);
            try {
                const tipoPessoa = documento.length <= 12 ? "PF" : "PJ";
                const payload = getPayload(documento, tipoPessoa);
                const response = await invokeLambda(functionName, payload);
                const result = JSON.parse(response.Payload);
                const responseSerasa = result.response;
                console.log({ responseSerasa });
                handlePDFCreation(tipoPessoa, responseSerasa);
            } catch (error) {
                console.error("Ocorreu um erro na requisição:", error);
                alert(
                    `Erro ao gerar relatório para: ${documento}. Detalhes do erro: ${error.message}`
                );
                // Tratar o erro de acordo com a necessidade
            }
        }
    }
};
