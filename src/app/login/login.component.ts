import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InternationalizationService } from '../shared/services/internationalization.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageDropdownComponent } from '../shared/components/language-dropdown/language-dropdown.component';
import { LoadingButtonComponent } from '../shared/components/loading-button/loading-button.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, NgbDropdownModule, TranslatePipe, LanguageDropdownComponent, LoadingButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  onceSubmitted: boolean = false;
  isLoading: boolean = false;
  errorI18n: string | undefined;
  show: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    public internationalizationService: InternationalizationService
  ) { }


  submitForm() {
    this.onceSubmitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(["/"]);
          },
          error: (error) => {
            this.isLoading = false;
            if (error.status === 401) {
              this.errorI18n = 'login.badCredentials';
            } else {
              this.errorI18n = 'genericError';
            }
          }
        });
    }
  }

}
