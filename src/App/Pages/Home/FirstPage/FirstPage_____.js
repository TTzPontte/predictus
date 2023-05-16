import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { InfoHelp } from "./Help";
import { Col, Row } from "react-bootstrap";
import {PDFImage} from "pdf-image";
import * as fs from "fs";


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

function FirstPage({ handleUpload }) {
  const [file, setFile] = useState(null);
  const uploadInputRef = useRef(null);

  const handleUploadImage = async (ev) => {
    ev.preventDefault();
    const file = uploadInputRef.current.files[0];
    handleUpload({ fileType: file.type, fileData: file, fileName: file.name });
  };

  const handleChange = (ev) => {
    setFile(ev.currentTarget.value);
  };

  const isFileSelected = () => !!file;

  return (
      <section className="ofx2">
        <div className="uploader">
          <div className="card">
            <Row>
              <form id="file-upload-form" onSubmit={handleUploadImage}>
                <input
                    ref={uploadInputRef}
                    type="file"
                    className="file-input"
                    accept=".pdf"
                    onChange={handleChange}
                    id="file-upload"
                />
                <label htmlFor="file-upload" id="file-drag">
                  <div>
                    <p className="lead">
                      Escolha um Arquivo <b>OFX</b>
                    </p>
                    <div id="start">
                      <i
                          className={`fa fa-download`}
                          aria-hidden="true"
                          style={isFileSelected() ? { color: "rebeccapurple" } : {}}
                      />
                      <InfoHelp />
                      <p>Select a file</p>
                    </div>
                  </div>
                </label>
                <div>
                  {isFileSelected() && (
                      <button type="submit">
                    <span id="file-upload-btn" className="btn btn-primary">
                      Submit
                    </span>
                      </button>
                  )}
                </div>
              </form>
            </Row>
          </div>
        </div>
      </section>
  );
}

FirstPage.propTypes = {
  handleUpload: PropTypes.func
};

export default FirstPage;
