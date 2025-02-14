import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'error-toast',
  imports: [NgbToastModule, TranslatePipe],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss'
})
export class ErrorToastComponent {
  show: boolean = false;
  errorI18n: string | undefined;
  errorMessage: string | undefined;

  constructor(private eventService: EventService) {
    this.eventService.listen('openToast', (errorMessage : any) => {
      console.log(errorMessage);
      if(errorMessage === 'genericError') {
        this.showI18nError(errorMessage);
      } else {
        this.showError(errorMessage);
      }
    })
  }

  showI18nError(errorI18n: string): void {
    this.errorI18n = errorI18n;
    this.show = true;
    setTimeout(() => (this.show = false), 3000);
  }

  showError(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.show = true;
    setTimeout(() => (this.show = false), 3000);
  }
}
