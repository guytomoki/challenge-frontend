import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListComponent } from './document-list.component';
import { SigningRequest } from '../shared/models/signingRequest';

describe('DocumentListComponent', () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentListComponent);
    component = fixture.componentInstance;
    component.signingRequest = { id: 1, isSigned: false, submissionDays: 3, documents: [] } as SigningRequest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
