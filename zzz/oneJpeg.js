const fs = require("fs");
const pdf2pic = require("pdf2pic");
const sharp = require("sharp");

// Set the input and output file paths
const inputFilePath = "input.pdf";
const outputFilePath = "output.jpg";

// Configure pdf2pic
const options = {
  density: 200, // DPI
  savePath: "./", // Output directory
  format: "jpeg", // Output format
  width: 1654, // Output width in pixels
  height: 2339 // Output height in pixels
};

// Create a pdf2pic instance
const converter = new pdf2pic(options);

// Read the PDF file and convert all pages to JPEGs
converter
  .convertBulk(inputFilePath, -1)
  .then((result) => {
    // Combine all JPEGs into a single image using sharp
    const images = result.map((file) => sharp(file.path));
    sharp(images)
      .join({ direction: true })
      .toFile(outputFilePath, (err) => {
        if (err) {
          console.error("Error combining images:", err);
        } else {
          console.log(`Successfully combined ${result.length} pages into ${outputFilePath}`);
          // Delete the temporary JPEG files
          result.forEach((file) => fs.unlinkSync(file.path));
        }
      });
  })
  .catch((err) => {
    console.error("Error converting PDF:", err);
  });
