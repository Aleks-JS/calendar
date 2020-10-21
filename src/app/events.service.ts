import { Events } from './events';

export class EventsService {
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
    }
  ];
  getData(): Events[] {
    return this.data;
  }
  addData(id: string, startDate: Date, endDate: Date, text: string) {
    this.data.push(new Events(id, startDate, endDate, text));
  }
}
