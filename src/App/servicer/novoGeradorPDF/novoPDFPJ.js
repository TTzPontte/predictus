import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function formatarData(data) {
    const partesData = data.split("-");
    const dia = partesData[2];
    const mes = partesData[1];
    const ano = partesData[0];
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
}

export function newPDFPJ(jsonFile) {

    //Receber Valores do JSon
    const data = JSON.parse(jsonFile);
    console.log({data})

    // Salvar Variáveis de Registro //
    const razaoSocial = data.reports[0].registration.companyName;
    const numDocumento = data.reports[0].registration.companyDocument;
    const dataAberturaEmpresa = data.reports[0].registration.foundationDate;
    const dataAberturaEmpresaFormatada = formatarData(dataAberturaEmpresa);
    const statusRegistro = data.reports[0].registration.statusRegistration;

     // Salvar Variáveis de Score //
    var score = data.reports[0].score.score;
    var probInadimplencia = data.reports[0].score.defaultRate;
    var messageScore = data.reports[0].score.message;
    if(messageScore==='SCORE NAO CALCULADO - INSUFICIENCIA INFORMACOES BASE DE DADOS SERASA EXPERIAN'){
        score = 0;
        probInadimplencia = 0;
    }else{
        messageScore=""
    }

    // Salvar Variáveis de Pefin //
    const pefin = data.reports[0].negativeData.pefin;
    const pefinResponse = pefin.pefinResponse || [];
    const pefinCount = pefin.summary.count
    const pefinSum = pefin.summary.balance

    // Salvar Variáveis de Refin //
    const refin = data.reports[0].negativeData.refin;
    const refinResponse = refin.refinResponse || [];
    const refinCount = refin.summary.count
    const refinSum = refin.summary.balance

    // Salvar Variáveis Protesto Nacional //
    const notory = data.reports[0].negativeData.notary;
    const notoryResponse = notory.notaryResponse || [];
    const notoryCount = notory.summary.count
    const notorySum = notory.summary.balance
    

  
    //Gerar PDF
    var dd = {
        background: function(currentPage) {
            return { canvas: [{ type: 'rect', x: 0, y: 0, w: 595.276, h: 841.890, color: '#FFFFFF' }] };
            // Fundo branco para a página inteira
        },
        content: [
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                stack: [
                                    { text: 'Serasa', style: 'header' }
                                ],
                                fillColor: '#ADD8E6' // Fundo azul para o texto 'Serasa'
                            }
                        ]
                    ]
                }
            },
            
            // Texto de Identificação
            {style: 'content',text: '\nIdentificação'},
            
            // Tabela Identificação
            {
                style: 'tableExample',
                table: {
                    widths: ['auto', '*', '*', '*'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Razão Social'},{alignment: 'center', bold: true, text: 'CNPJ'}, {alignment: 'center', bold: true, text:'Data de Abertura'}, {alignment: 'center', bold: true, text:'Situação do CNPJ'}],
                        [{alignment: 'center', text:razaoSocial}, {alignment: 'center', text: numDocumento}, {alignment: 'center', text:dataAberturaEmpresaFormatada},{alignment: 'center', text:statusRegistro}]
                    ]
                    
                }
            },
            
            
            // Quadrado Score
            {
                columns: [
                    
                    // Tabela do Score
                    {
                        style: 'tableScore',
                        table: {
                            widths: ['25%'],
                            body: [
                                [{text:'Score', alignment: 'center', color: "#FFFFFF", bold: 'true', fontSize: 14}],
                                [{text:score, alignment: 'center', color: "#FFFFFF", bold: 'true', fontSize: 26}],
                            ]
                        },
                        margin: [10, 15, 0, 0] // Margem para separar as tabelas
                    },
                    
                    // Texto de probabilidade inadimplência
                    {
                        text: [
                            { text: '\n\nProbabilidade de inadimplência\n---------------------------------------->', alignment: 'center', color: '#F', bold: true, fontSize: 14 },
                        ],
                        margin: [-250, 0, 0, 0]
                    },
                    
                    // Círculo Teste
                    {
                     style: 'tableScore',
                        table: {
                            heights:[20],
                            widths: ['25%'],
                            body: [
                                [{text:probInadimplencia, style: 'centeredText', color: "#FFFFFF", bold: 'true', fontSize: 26}],
                            ]
                        },
                        margin: [-95, 30, 0, 0] // Margem para separar as tabelas   
                    }
                ]
            },

            //Mensagem de erro do score
            {style: 'content', fontSize: '12', color:'#b81414',text:'\n'+messageScore},

            // Texto de Identificação
            {style: 'content',text: '\nDados de negativação'},
            
            //Resumo Pefin
            {
                style: 'tableResumo',
                table: {
                    widths: ['14%', '14%', '14%', '14%'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Pefin', color:'#4B0082'},{alignment: 'center', bold: true, color:'#4B0082', text: pefinCount}, {alignment: 'center', bold: true, color:'#4B0082', text:'Valor Total'}, {alignment: 'center', bold: true, color:'#4B0082', text:pefinSum}],
                    ]
                    
                }
            },
            
            //Pefin
            {
                style: 'tableInfos',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Natureza'}, {alignment: 'center', bold: true, text:'Credor'}, {alignment: 'center', bold: true, text:'Valor'}, {alignment: 'center', bold: true, text:'Data'},{alignment: 'center', bold: true, text:'Cidade'},{alignment: 'center', bold: true, text:'Estado'},{alignment: 'center', bold: true, text:'Resumo'}],
                        [{alignment: 'center', text: 'Outras operações'}, {alignment: 'center', text:'Telefonica Brasil S.A'}, {alignment: 'center', text:'2.500,00'}, {alignment: 'center', text:'14/04/2023'},{alignment: 'center', text:'São Paulo'},{alignment: 'center', text:'SP'},{alignment: 'center', text:'Pefin [Outras Oper - Telefonica 08/2022]'}],
                    ]
                    
                }
            },
            
            //Resumo Refin
            {
                style: 'tableResumo',
                table: {
                    widths: ['14%', '14%', '14%', '14%'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Refin', color:'#4B0082'},{alignment: 'center', bold: true, color:'#4B0082', text: '1'}, {alignment: 'center', bold: true, color:'#4B0082', text:'Valor Total'}, {alignment: 'center', bold: true, color:'#4B0082', text:'1.200,00'}],
                    ]
                    
                }
            },
            
            //Refin
            {
                style: 'tableInfos',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Natureza'}, {alignment: 'center', bold: true, text:'Credor'}, {alignment: 'center', bold: true, text:'Valor'}, {alignment: 'center', bold: true, text:'Data'},{alignment: 'center', bold: true, text:'Cidade'},{alignment: 'center', bold: true, text:'Estado'},{alignment: 'center', bold: true, text:'Resumo'}],
                        [{alignment: 'center', text: 'Outras operações'}, {alignment: 'center', text:'Bradesco'}, {alignment: 'center', text:'1.200,00'}, {alignment: 'center', text:'15/04/2023'},{alignment: 'center', text:'São Paulo'},{alignment: 'center', text:'SP'},{alignment: 'center', text:'Refin [Cred Cartão - Bradesco 04/2023]'}],
                    ]
                    
                }
            },
            
            //Resumo Protestos
            {
                style: 'tableResumo',
                table: {
                    widths: ['14%', '14%', '14%', '14%'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Protestos', color:'#4B0082'},{alignment: 'center', bold: true, color:'#4B0082', text: '1'}, {alignment: 'center', bold: true, color:'#4B0082', text:'Valor Total'}, {alignment: 'center', bold: true, color:'#4B0082', text:'2.300,00'}],
                    ]
                    
                }
            },
            
            //Protestos
            {
                style: 'tableInfos',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Cartório'},{alignment: 'center', bold: true, text: 'Cidade'}, {alignment: 'center', bold: true, text:'UF'}, {alignment: 'center', bold: true, text:'Data'}, {alignment: 'center', bold: true, text:'Valor'},{alignment: 'center', bold: true, text:'Resumo'}],
                        [{alignment: 'center', text: 'UN'},{alignment: 'center', text: 'São Paulo'}, {alignment: 'center', text:'SP'}, {alignment: 'center', text:'18/05/2023'}, {alignment: 'center', text:'2.300,00'},{alignment: 'center', text:'Protestos [São Paulo 05/2023]'}],
                    ]
                    
                }
            },
        
            //Resumo Ação Judicial
            {
                style: 'tableResumo',
                table: {
                    widths: ['14%', '14%', '14%', '14%'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Ação Judicial', color:'#4B0082'},{alignment: 'center', bold: true, color:'#4B0082', text: '1'}, {alignment: 'center', bold: true, color:'#4B0082', text:'Valor Total'}, {alignment: 'center', bold: true, color:'#4B0082', text:'44.693,00'}],
                    ]
                    
                }
            },
            
            //Ação Judicial
            {
                style: 'tableInfos',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'Natureza'},{alignment: 'center', bold: true, text: 'Cidade'}, {alignment: 'center', bold: true, text:'UF'}, {alignment: 'center', bold: true, text:'Data'}, {alignment: 'center', bold: true, text:'Valor'},{alignment: 'center', bold: true, text:'Resumo'}],
                        [{alignment: 'center', text: 'Execução'},{alignment: 'center', text: 'São Paulo'}, {alignment: 'center', text:'SP'}, {alignment: 'center', text:'18/05/2023'}, {alignment: 'center', text:'44.693,00'},{alignment: 'center', text:'Ação Judicial [São Paulo 05/2023]'}],
                    ]
                    
                }
            },
            
            
            {style:'content', text:"\n\nParticipação Societaria"},
            //Ação Judicial
            {
                style: 'tableInfos',
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [{alignment: 'center', bold: true, text: 'CPF/CNPJ'},{alignment: 'center', bold: true, text: 'Sócio'}, {alignment: 'center', bold: true, text:'Participação'}],
                        [{alignment: 'center', text: '758.136.613-87'},{alignment: 'center', text: 'ROGERIO ARAUJO COSTA'}, {alignment: 'center', text:'100%'}],
                    ]
                    
                }
            },
            
        
        ],
        styles: {
            
            centeredText: {
            alignment: 'center',
            verticalAlignment: 'middle',
            },
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center'
            },
            content: {
                fontSize: 16,
                color:'#4B0082',
                margin: [10, 0, 0, 0],
                bold: 'true,'
                
            },
            tableExample: {
                width: '100%',
                margin: [10, 5, 10, 0],
                fillColor: '#F0FFFF',
                
            },
            tableScore:{
                margin:[10,15,10,0],
                fillColor: '#4682B4',
            },
            tableInadimplencia:{
                margin:[10,15,10,0],
                    fillColor: '#4682B4',
            },
            tableResumo: {
                width: '100%',
                margin: [10, 15, 0, 0],
                fillColor: '#DCDCDC',
                
            },
            tableInfos: {
                width: '100%',
                margin: [10, 0.4, 10, 0],
                fillColor: '#F0FFFF',
                
            },
    
        },
        pageSize: { width: 595.276, height: 841.890 },
        pageMargins: [0, 0, 0, 0] 
    }

    // Create a new PDF document
    const pdfDocGenerator = pdfMake.createPdf(dd);

    // Download the PDF document
    pdfDocGenerator.download(razaoSocial + '.pdf');

}
