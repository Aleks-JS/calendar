
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, map} from 'rxjs/operators'

const years = [];

for (let index = 1970; index<2030; index ++) {
  years.push(index)
}

type Event = {
  id: string;
  startDate: Date;
  endDate: Date
  text: string;
}

// Массив событий на 14 октября 2020 в разное время
// доп задание: сделать сервис(для получение списка эвентов )
const events: Array<Event> = [
  {
    id: "1",
    startDate: new Date(1602644400000), // 5-7
    endDate: new Date(1602651600000),
    text: "Выкинуть мусор"
  },
  {
    id: "2",
    startDate: new Date(1602676800000), // 14-15
    endDate: new Date(1602680400000),
    text: "Посмотреть телевизор"
  },
  {
    id: "3",
    startDate: new Date(1602698400000), // 20-22
    endDate: new Date(1602705600000),
    text: "Послушать подкаст"
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  allYears = years

  yearsControl = new FormControl((new Date).getFullYear())

  currentYear$ = this.yearsControl.valueChanges.pipe(
    filter((value) => parseInt(value).toString() == value),
    map((value) => parseInt(value))
  )

  currentDay$ = new Subject()

  // Сделать так чтобы при выборе месяца и года показывалось правильное число дней
  // Подсказка: смотри combineLatest

  dayInMonth$ = this.currentYear$.pipe(
    map((value) => {
      if (value % 2 == 0) {
        return Array(15).fill(0).map((_, index) => index)
      }
      return Array(31).fill(0).map((_, index) => index)
    })
  )

  // Сделать список месяцев
  setDay(day: number) {
    this.currentDay$.next(day)
  }

  // Меняет на предыдущий месяц
  prevMonth() {

  }

  // Меняет на след месяц
  nextMonth() {

  }
}
