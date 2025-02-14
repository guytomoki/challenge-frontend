import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SigningRequest } from '../shared/models/signingRequest';
import { Doc } from '../shared/models/doc';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'document-list',
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {
    @Input() signingRequest!: SigningRequest;
    @Input() selectedDoc: Doc | undefined;
    @Output() selectedDocChange = new EventEmitter<Doc>();
    @Input() isContentVisible: boolean | undefined;
    @Output() isContentVisibleChange = new EventEmitter<boolean>();

    selectDoc(doc: Doc): void {
      this.isContentVisible = !this.isContentVisible;
      this.selectedDoc = doc;
      this.selectedDocChange.emit(doc);
      this.isContentVisibleChange.emit(this.isContentVisible);
    }

}
