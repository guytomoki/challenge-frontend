import { TestBed } from '@angular/core/testing';

import { SigningRequestService } from './signing-request.service';
import { provideHttpClient } from '@angular/common/http';

describe('SigningRequestService', () => {
  let service: SigningRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(SigningRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
