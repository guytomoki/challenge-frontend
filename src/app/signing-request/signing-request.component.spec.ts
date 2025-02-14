import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningRequestComponent } from './signing-request.component';
import { SigningRequestService } from '../shared/services/signing-request.service';
import { SigningRequest } from '../shared/models/signingRequest';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { LoadingButtonComponent } from '../shared/components/loading-button/loading-button.component';
import { EventService } from '../shared/services/event.service';

describe('SigningRequestComponent', () => {
  let component: SigningRequestComponent;
  let fixture: ComponentFixture<SigningRequestComponent>;
  let signingRequestService: jasmine.SpyObj<SigningRequestService>;
  let eventService: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    const signingRequestServiceSpy = jasmine.createSpyObj('SigningRequestService', ['getSigningRequest', 'sign']);
    const eventServiceSpy = jasmine.createSpyObj('EventService', ['emit']);

    await TestBed.configureTestingModule({
      imports: [SigningRequestComponent],
      providers: [
        provideHttpClient(),
        provideTranslateService(),
        { provide: SigningRequestService, useValue: signingRequestServiceSpy },
        { provide: EventService, useValue: eventServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SigningRequestComponent);
    component = fixture.componentInstance;
    signingRequestService = TestBed.inject(SigningRequestService) as jasmine.SpyObj<SigningRequestService>;
    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;

    const mockSigningRequest: SigningRequest = {
      id: 1,
      submissionDays: 5,
      documents: [{ id: 1, isConfirmed: true, fileName: "doc1.pdf" }, { id: 2, isConfirmed: false, fileName: "doc2.pdf" }],
      isSigned: false
    };
    signingRequestService.getSigningRequest.and.returnValue(of(mockSigningRequest));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch signing request on init', () => {
    expect(signingRequestService.getSigningRequest).toHaveBeenCalled();
    expect(component.signingRequest).toBeDefined();
    expect(component.dayCount).toBe(5);
    expect(component.documentCount).toBe(2);
  });

  it('should disable signing if at least one document is not confirmed', () => {
    component.signingRequest = {
      id: 1,
      submissionDays: 5,
      documents: [
        { id: 1, isConfirmed: true, fileName: 'doc1.pdf' },
        { id: 2, isConfirmed: true, fileName: 'doc2.pdf' },
        { id: 3, isConfirmed: false, fileName: 'doc3.pdf' }
      ],
      isSigned: false
    };
    fixture.detectChanges();
    expect(component.isSigningDisabled()).toBeTrue();
    const debugElement = fixture.debugElement.query(By.directive(LoadingButtonComponent));
    const loadingButtonComponentInstance = debugElement.componentInstance as LoadingButtonComponent;
    expect(loadingButtonComponentInstance.disabled).toBeTrue();
  });

  it('should disable signing if the signing request is already signed', () => {
    component.signingRequest = {
      id: 1,
      submissionDays: 5,
      documents: [
        { id: 1, isConfirmed: true, fileName: 'doc1.pdf' },
        { id: 2, isConfirmed: true, fileName: 'doc2.pdf' },
        { id: 3, isConfirmed: true, fileName: 'doc3.pdf' }
      ],
      isSigned: true
    };
    fixture.detectChanges();
    expect(component.isSigningDisabled()).toBeTrue();
    const loadingButton = fixture.debugElement.query(By.directive(LoadingButtonComponent));
    expect(loadingButton).toBeNull();
  });

  it('should enable signing if all documents are confirmed and signing request not yet signed', () => {
    component.signingRequest = {
      id: 1,
      submissionDays: 5,
      documents: [
        { id: 1, isConfirmed: true, fileName: 'doc1.pdf' },
        { id: 2, isConfirmed: true, fileName: 'doc2.pdf' },
        { id: 3, isConfirmed: true, fileName: 'doc3.pdf' }
      ],
      isSigned: false
    };
    fixture.detectChanges();
    expect(component.isSigningDisabled()).toBeFalse();
    const loadingButton = fixture.debugElement.query(By.directive(LoadingButtonComponent));
    const loadingButtonComponentInstance = loadingButton.componentInstance as LoadingButtonComponent;
    expect(loadingButtonComponentInstance.disabled).toBeFalse();
  });

  it('should sign the request and update state', () => {
    const mockUpdatedRequest: SigningRequest = {
      id: 1,
      submissionDays: 5,
      documents: [],
      isSigned: true
    };
    signingRequestService.sign.and.returnValue(of(mockUpdatedRequest));

    component.sign();
    fixture.detectChanges();
    expect(component.signingRequest).toEqual(mockUpdatedRequest);
    const signedMessage = fixture.debugElement.query(By.css('[data-testid="signed-document"]'));
    expect(signedMessage).not.toBeNull();
  });

  it('should emit openToast event when receiving an error on sign request', () => {
    signingRequestService.sign.and.returnValue(throwError(() => new Error('Error')));

    component.sign();
    fixture.detectChanges();
    expect(eventService.emit).toHaveBeenCalledWith('openToast', 'genericError');
    const signedMessage = fixture.debugElement.query(By.css('[data-testid="signed-document"]'));
    expect(signedMessage).toBeNull();
  });
});
