export function getPJInfo(result) {
  console.log("getPJInfo chamada com resultado:", result)
    const partnerInfo = [];
  
    // Verifica se o objeto result contém as chaves necessárias
    if (
      result.optionalFeatures &&
      result.optionalFeatures.partner &&
      result.optionalFeatures.partner.partnershipResponse
    ) {
      const partnershipResponse = result.optionalFeatures.partner.partnershipResponse;
  
      // Loop pelos itens em partnershipResponse
      for (let i = 0; i < partnershipResponse.length; i++) {
        const partner = partnershipResponse[i];
  
        // Armazena as informações desejadas em um novo objeto
        const partnerData = {
          businessDocument: partner.businessDocument,
          companyName: partner.companyName,
          participationPercentage: partner.participationPercentage,
          companyStatusCode: partner.companyStatusCode,
        };
  
        // Adiciona o novo objeto ao array partnerInfo
        partnerInfo.push(partnerData);
      }
    }
    
    console.log('Resultado: ', partnerInfo)

    return partnerInfo;
  }