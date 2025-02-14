import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InternationalizationService } from './shared/services/internationalization.service';
import { ErrorToastComponent } from './shared/components/error-toast/error-toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'challenge-frontend';

  constructor(private internationalizationService: InternationalizationService) {
    this.internationalizationService.initialize();
  }
}
