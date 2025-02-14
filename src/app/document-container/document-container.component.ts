import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfContainerComponent } from '../shared/components/pdf-container/pdf-container.component';
import { Doc } from '../shared/models/doc';
import { DocumentService } from '../shared/services/document.service';
import { SigningRequest } from '../shared/models/signingRequest';
import { LoadingButtonComponent } from '../shared/components/loading-button/loading-button.component';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'document-container',
  imports: [TranslatePipe, PdfContainerComponent, LoadingButtonComponent],
  templateUrl: './document-container.component.html',
  styleUrl: './document-container.component.scss'
})
export class DocumentContainerComponent implements OnChanges{
  @Input() selectedDoc: Doc | undefined;
  @Output() selectedDocChange = new EventEmitter<Doc>();
  @Input() signingRequest!: SigningRequest;
  @ViewChild(PdfContainerComponent) pdfContainerComponent!: PdfContainerComponent;
  isLoading: boolean = false;

  constructor(private documentService: DocumentService, private eventService: EventService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDoc'] && changes['selectedDoc'].currentValue) {
      this.fetchPdfFromApi(changes['selectedDoc'].currentValue.id);
    }
  }

  fetchPdfFromApi(documentId: number): void {
    this.documentService.getDocumentContent(documentId)
    .subscribe({
      next: (data) => {
        this.pdfContainerComponent.renderPdf(data);
      },
      error: (error) => {
        this.eventService.emit('openToast', 'genericError');
      }
    });
  }

  confirm(doc: Doc): void {
    this.isLoading = true;
    this.documentService.confirmDocument(doc.id)
      .subscribe({
        next: (data) => {
          const docIndex = this.signingRequest.documents.findIndex(document => document.id === data.id);
          this.signingRequest.documents[docIndex] = data;
          this.selectedDocChange.emit(data);
          this.isLoading = false;
        },
        error: (error) => {
          if (error.status === 422) {
            this.eventService.emit('openToast', error.error.message);
          } else {
            this.eventService.emit('openToast', 'genericError');
          }
          this.isLoading = false;
        }
      });
  }

  

}
