const fs = require('fs');
const PDFImage = require('pdf-image').PDFImage;

// Set the path to the input PDF file
const inputPath = '/Users/Mr-i-me/code/Mr-i-me-pontte/Pontte/Apis_test/predictus/zzz/SANTANDER.pdf';

// Set the output directory for the JPEG images
const outputDir = '/Users/Mr-i-me/code/Mr-i-me-pontte/Pontte/Apis_test/predictus/zzz/output';

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Instantiate a new PDFImage object
const pdfImage = new PDFImage(inputPath);

// Set the output format to JPEG
pdfImage.setConvertExtension('jpg');

// Set the output directory and additional conversion options
pdfImage.setConvertOptions({ '-quality': '100', '-density': '300', '-flatten': null });

// Get the number of pages in the PDF file
pdfImage.numberOfPages().then(function (numPages) {
    // Convert each page of the PDF to a separate JPEG image
    for (let i = 0; i < numPages; i++) {
        const outputPath = `${outputDir}/page-${i + 1}.jpg`;
        pdfImage.convertPage(i).then(function (imagePath) {
            fs.renameSync(imagePath, outputPath);
            console.log(`Converted page ${i + 1} to ${outputPath}`);
        });
    }
});
