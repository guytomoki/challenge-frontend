import { Component, OnInit } from '@angular/core';
import { SigningRequestService } from '../shared/services/signing-request.service';
import { SigningRequest } from '../shared/models/signingRequest';
import { MatIconModule } from '@angular/material/icon';
import { LanguageDropdownComponent } from '../shared/components/language-dropdown/language-dropdown.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Doc } from '../shared/models/doc';
import { DocumentContainerComponent } from '../document-container/document-container.component';
import { LoadingButtonComponent } from '../shared/components/loading-button/loading-button.component';
import { EventService } from '../shared/services/event.service';
import { DocumentListComponent } from '../document-list/document-list.component';

@Component({
  selector: 'app-signing-request',
  imports: [CommonModule, MatIconModule, LanguageDropdownComponent, TranslatePipe,
     DocumentContainerComponent, DocumentListComponent, LoadingButtonComponent],
  templateUrl: './signing-request.component.html',
  styleUrl: './signing-request.component.scss'
})
export class SigningRequestComponent implements OnInit {

  signingRequest!: SigningRequest;
  isContentVisible: boolean = false;
  documentCount: number = 0;
  dayCount: number = 0;
  selectedDoc: Doc | undefined;
  isConfirmSigningLoading: boolean = false;

  constructor(private signingRequestService: SigningRequestService, private eventService: EventService) {
  }
  ngOnInit(): void {
    this.signingRequestService.getSigningRequest()
      .subscribe({
        next: (data) => {
          this.signingRequest = data;
          this.signingRequest.documents.sort((a, b) => a.id - b.id);
          this.documentCount = this.signingRequest.documents.length || 0;
          this.dayCount = this.signingRequest.submissionDays || 0;
        },
        error: (error) => {
          this.eventService.emit('openToast', 'genericError');
        }
      });
  }

  toggleView(): void {
    this.isContentVisible = !this.isContentVisible;
  }

  sign(): void {
    this.isConfirmSigningLoading = true;
    this.signingRequestService.sign()
      .subscribe({
        next: (data) => {
          this.signingRequest = data;
          this.isConfirmSigningLoading = false;
        },
        error: (error) => {
          if (error.status === 422) {
            this.eventService.emit('openToast', error.error.message);
          } else {
            this.eventService.emit('openToast', 'genericError');
          }
          this.isConfirmSigningLoading = false;
        }
      });
  }

  isSigningDisabled(): boolean {
    return this.signingRequest.isSigned || this.signingRequest.documents.some(doc => !doc.isConfirmed);
  }

}
