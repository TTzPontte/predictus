import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function createPDF() {
  // Define the content for the PDF document
  const documentDefinition = {
    content: [
      { text: 'Hello, world!', fontSize: 14 }
    ]
  };

  // Create a new PDF document
  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

  // Download the PDF document
  pdfDocGenerator.download('output.pdf');
}

