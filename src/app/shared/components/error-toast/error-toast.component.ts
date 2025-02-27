import { Component, OnDestroy } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'error-toast',
  imports: [NgbToastModule, TranslatePipe],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss'
})
export class ErrorToastComponent implements OnDestroy {
  show: boolean = false;
  errorI18n: string | undefined;
  errorMessage: string | undefined;
  events: Subscription;

  constructor(private eventService: EventService) {
    this.events = this.eventService.listen('openToast', (errorMessage : any) => {
      console.log(errorMessage);
      if(errorMessage === 'genericError') {
        this.showI18nError(errorMessage);
      } else {
        this.showError(errorMessage);
      }
    })
  }

  ngOnDestroy(): void {
    this.events.unsubscribe();
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
