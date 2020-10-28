import { Event } from '../interfaces/event.interface';
import { BehaviorSubject, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private data: Event[] = [
    {
      id: '1',
      startDate: new Date(1602644400000), // 5-7
      endDate: new Date(1602651600000),
      text: 'Выкинуть мусор'
    },
    {
      id: '2',
      startDate: new Date(1602676800000), // 14-15
      endDate: new Date(1602680400000),
      text: 'Посмотреть телевизор'
    },
    {
      id: '3',
      startDate: new Date(1602698400000), // 20-22
      endDate: new Date(1602705600000),
      text: 'Послушать подкаст'
    },
    {
      id: '4',
      startDate: new Date(1602522200000), // 20-22
      endDate: new Date(1602758800000),
      text: 'Послушать подкаст'
    },
  ];

  draft$ = new BehaviorSubject([])

  draftObs = this.draft$.asObservable()

  data$ = new BehaviorSubject(this.data)

  obsData$ = this.data$.asObservable().pipe(
    map((val) => val.reduce((prev, current) => {
      const key = `${current.startDate.getDate()}.${current.startDate.getMonth()}.${current.startDate.getFullYear()}`;
      if (!prev[key]) {
        prev[key] = [current];
      } else {
        prev[key].push(current);
      }
      return prev;
    }, {}))
  );

  getData() {
    return (this.obsData$)
  }

  removeData(id: string) {
    this.data$.next(this.data$.value.filter(e => e.id !== id));
  }

  addData(event: Event) {

    this.data$.next([...this.data$.value,
    { ...event, id: `${this.data$.value.length + 1}` }
    ])
  }

  getDrafts() {
    return this.draftObs
  }

  appDrafts(draft) {
    this.draft$.next([...this.draft$.value, draft])
  }

}
