import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private subject = new Subject();

  emit(eventName: string, payload: any) {
      this.subject.next({eventName, payload});
  }

  listen(eventName: string, callback: (event: any) => void): Subscription {
      return this.subject.asObservable().subscribe((nextObj : any) => {
          if (eventName === nextObj.eventName) {
              callback(nextObj.payload);
          }
      });
  }
}
