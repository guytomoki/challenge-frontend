import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDropdownComponent } from './language-dropdown.component';
import { provideTranslateService } from '@ngx-translate/core';

describe('LanguageDropdownComponent', () => {
  let component: LanguageDropdownComponent;
  let fixture: ComponentFixture<LanguageDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageDropdownComponent],
      providers: [provideTranslateService()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
