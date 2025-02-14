import { Component } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

@Component({
  selector: 'pdf-container',
  imports: [],
  templateUrl: './pdf-container.component.html',
  styleUrl: './pdf-container.component.scss'
})
export class PdfContainerComponent {

  renderPdf(pdfData: string): void {
    const loadingTask = pdfjsLib.getDocument({ data: this.base64ToArrayBuffer(pdfData) });
    loadingTask.promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const firstChild = document.getElementById('pdf-container')!.firstElementChild;
        if (firstChild) {
          document.getElementById('pdf-container')!.removeChild(firstChild);
        }

        const viewport = page.getViewport({ scale: 1.5 });
        // debugger;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = document.getElementById('pdf-container')!.offsetWidth - 100;
        canvas.height = canvas.width * viewport.height / viewport.width;

        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          const renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            document.getElementById('pdf-container')?.appendChild(canvas);
          });
        }
      });
    });
  }


  base64ToArrayBuffer(pdfData: string) {
    var binaryString = window.atob(pdfData);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

}
