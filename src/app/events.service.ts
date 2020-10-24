import { Events } from './events';
import { of } from "rxjs";
import { map } from "rxjs/operators";

export class EventsService {
  private id: number = 4;
  private data: Events[] = [
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

  get() {
    return this.data;
  }

  getData() {
    return of(this.data).pipe(
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
  }

  removeData(id: string) {
    this.data = this.data.filter(e => e.id !== id);
  }

  incrementId() {
    return ++this.id
  }

  setData(data) {
    this.data.push({
      id: this.incrementId().toString(),
      startDate: new Date('' + data.startDate + 'T' + data.startTime + ':00'),
      endDate: new Date('' + data.endDate + 'T' + data.endTime + ':00'),
      text: data.eventDescription
    })
  }
}
