export const transactions = [
    {
        date: "01/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "0,50",
        balance: "0,18"
    },
    {
        date: "05/08/2022",
        description: "CRED TED",
        location: "",
        credit: "6.618,85",
        debit: "",
        balance: "6.619,03"
    },
    {
        date: "05/08/2022",
        description: "PREST EMP",
        location: "",
        credit: "",
        debit: "769,14",
        balance: "5.849,89"
    },
    {
        date: "05/08/2022",
        description: "DB CEST PJ",
        location: "",
        credit: "",
        debit: "25,00",
        balance: "5.824,89"
    },
    {
        date: "08/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "223,12",
        balance: "5.601,77"
    },
    {
        date: "08/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "95,00",
        balance: "5.506,77"
    },
    {
        date: "09/08/2022",
        description: "PAG BOLETO",
        location: "",
        credit: "",
        debit: "2.421,02",
        balance: "3.085,75"
    },
    {
        date: "09/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "630,00",
        balance: "2.455,75"
    },
    {
        date: "09/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "60,00",
        balance: "2.395,75"
    },
    {
        date: "09/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "129,07",
        balance: "2.266,68"
    },
    {
        date: "09/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "17,50",
        balance: "2.249,18"
    },
    {
        date: "09/08/2022",
        description: "ENVIO PIX",
        location: "",
        credit: "",
        debit: "24,45",
        balance: "2.224,73"
    },
    {
        date: "10/08/2022",
        description: "PAG BOLETO",
        location: "",
        credit: "",
        debit: "780,00",
        balance: "1.444,73"
    },
    {
        date: "10/08/2022",
        description: "PAG BOLETO",
        location: "",
        credit: "",
        debit: "140,00",
        balance: "1.304,73"
    },
]
export const defaultValue = {
    bank: {
        code: "",
        name: "Caixa"
    },
    statement: {
        startDate: "",
        endDate: "",
        balanceDate: "",
        total: {
            credit: "",
            debit: "",
            balance: ""
        },
        transactions: [],
        monthlyTransactions: transactions
    }
};
