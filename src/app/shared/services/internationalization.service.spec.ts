import { TestBed } from '@angular/core/testing';

import { InternationalizationService } from './internationalization.service';
import { provideTranslateService } from '@ngx-translate/core';

describe('InternationalizationService', () => {
  let service: InternationalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTranslateService()]
    });
    service = TestBed.inject(InternationalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
