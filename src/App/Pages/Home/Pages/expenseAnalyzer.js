import { Storage, Predictions } from "aws-amplify";
import * as XLSX from "xlsx";
import { pdfjs } from "react-pdf";

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class ExpenseAnalyzer {
  async uploadPdfToS3(file, bucket, key) {
    try {
      await Storage.put(key, file, {
        bucket,
        contentType: file.type
      });
    } catch (error) {
      console.error("Failed to upload PDF to S3:", error);
      throw error;
    }
  }

  async convertPdfToImages(pdfData) {
    const images = [];
    const loadingTask = pdfjs.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const image = await this.convertPageToImage(pdf, pageNumber);
      images.push(image);
    }

    return images;
  }

  async convertPageToImage(pdf, pageNumber) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    const imageDataUrl = canvas.toDataURL("image/jpeg");
    return imageDataUrl;
  }

  async analyzeExpenses(images) {
    const analyzedExpenses = [];

    for (const image of images) {
      const response = await this.analyzeExpenseDocument(image);
      analyzedExpenses.push(...response);
    }

    return analyzedExpenses;
  }

  async analyzeExpenseDocument(image) {
    try {
      const response = await Predictions.identify({
        text: {
          source: {
            bytes: image
          }
        }
      });

      const expenses = [];
      for (const doc of response.text.fullTextExtracts) {
        const expense = doc.text.split("\n").filter(Boolean);
        expenses.push(expense);
      }
      return expenses;
    } catch (error) {
      console.error("Failed to analyze expense document:", error);
      throw error;
    }
  }

  createExpenseReport(expenses) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(expenses);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    return workbook;
  }
}

export default ExpenseAnalyzer;
