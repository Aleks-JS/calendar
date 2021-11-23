import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { EventBus } from './event-bus.class';
import { DestroyService } from '@services/destroy.service';

@Injectable({
  providedIn: 'root'
})
export class EventBusService extends DestroyService {
  private subject$ = new Subject<EventBus>();

  constructor() {
    super();
  }

  emit(event: EventBus): void {
    this.subject$.next(event);
  }

  on(eventName: string, action: () => void): Subscription {
    return this.subject$.pipe(
      filter((e: EventBus) => e.name === eventName),
      map((e: EventBus) => e.value),
      takeUntil(this)
    ).subscribe(action);
  }
}
