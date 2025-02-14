import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigningRequestComponent } from './signing-request/signing-request.component';
import { AuthorizeGuard } from './shared/services/authorize-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: SigningRequestComponent, canActivate : [AuthorizeGuard] },
];
