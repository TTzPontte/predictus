function replaceUTF8Accents(str) {
    const accentsMap = {
      'Ã‰': 'É',
      // Outros mapeamentos de caracteres aqui
    };
  
    return str.replace(/./g, char => accentsMap[char] || char);
  }
  
  const legalNatureWithUTF8Accents = "EMPRÃ‰STIMO";
  const correctedLegalNature = replaceUTF8Accents(legalNatureWithUTF8Accents);
  
  console.log(correctedLegalNature); // Deve imprimir "EMPRÉSTIMO"
  