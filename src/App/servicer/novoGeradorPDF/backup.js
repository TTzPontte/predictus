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
					[{alignment: 'center', text:'Garden Residencial Empreendimentos'}, {alignment: 'center', text:'13.133.133/0001-02'}, {alignment: 'center', text:'23/01/1998'},{alignment: 'center', text:'Ativo'}]
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
                            [{text:'830', alignment: 'center', color: "#FFFFFF", bold: 'true', fontSize: 26}],
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
                            [{text:'7%', style: 'centeredText', color: "#FFFFFF", bold: 'true', fontSize: 26}],
                        ]
                    },
                    margin: [-95, 30, 0, 0] // Margem para separar as tabelas   
                }
            ]
        },
        
        // Texto de Identificação
        {style: 'content',text: '\nDados de negativação'},
        
        //Resumo Pefin
        {
			style: 'tableResumo',
			table: {
			    widths: ['14%', '14%', '14%', '14%'],
				body: [
					[{alignment: 'center', bold: true, text: 'Pefin', color:'#4B0082'},{alignment: 'center', bold: true, color:'#4B0082', text: '1'}, {alignment: 'center', bold: true, color:'#4B0082', text:'Valor Total'}, {alignment: 'center', bold: true, color:'#4B0082', text:'2.500,00'}],
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