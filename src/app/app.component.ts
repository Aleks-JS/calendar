import { MatDialogModule } from '@angular/material';
/* tslint:disable:radix */
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit
} from '@angular/core';
<<<<<<< HEAD
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
=======
import {FormControl} from '@angular/forms';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {filter, map, combineLatest} from 'rxjs/operators';
>>>>>>> parent of d83014f... Lesson 3. Changing the method of generating days by months. A service for obtaining data on Events has been implemented. Implemented a method for deleting an event when you click on it
import { EventsService } from './events.service';
import { Events } from './events';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const currentDate = new Date();
const years = [];

for (let index = 1970; index < 2030; index++) {
  years.push(index);
}

// const months = [
//   {0: 'январь'}, {1: 'февраль'}, {2: 'март'},
//   {3: 'апрель'}, {4: 'май'}, {5: 'июнь'},
//   {6: 'июль'}, {7: 'август'}, {8: 'сентябрь'},
//   {9: 'октябрь'}, {10: 'ноябрь'}, {11: 'декабрь'}
// ];

const months = [
  'январь', 'февраль', 'март',
  'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь',
  'октябрь', 'ноябрь', 'декабрь'
];
//
// type Event = {
//   id: string;
//   startDate: Date;
//   endDate: Date
//   text: string;
// };

// Массив событий на 14 октября 2020 в разное время
// доп задание: сделать сервис(для получение списка эвентов )
// const events: Array<Event> = [
//   {
//     id: "1",
//     startDate: new Date(1602644400000), // 5-7
//     endDate: new Date(1602651600000),
//     text: 'Выкинуть мусор'
//   },
//   {
//     id: "2",
//     startDate: new Date(1602676800000), // 14-15
//     endDate: new Date(1602680400000),
//     text: 'Посмотреть телевизор'
//   },
//   {
//     id: "3",
//     startDate: new Date(1602698400000), // 20-22
//     endDate: new Date(1602705600000),
//     text: 'Послушать подкаст'
//   }
// ]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [EventsService],
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterContentChecked, DoCheck {

  allYears = years;
  allMonth = months;
  today = currentDate;
  currentYear: number = this.today.getFullYear();
  currentMonth: string = this.today.toLocaleString('ru', {
    month: 'long'
  });
  sDay: string;

  yearsControl = new FormControl(this.currentYear);
  monthControl = new FormControl(this.currentMonth);

  events: Events[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.events = this.eventsService.getData();
    this.yearsControl.valueChanges.subscribe(value => this.currentYear$.next(value));
    this.monthControl.valueChanges.subscribe(value => this.currentMonth$.next(value));
    this.selectedDate$.subscribe(value => this.sDay = value.toDateString());
    console.log(this.selectedDate$.value);
    console.log(this.allMonth.indexOf(this.monthControl.value));
    console.log(this.events);
  }

  ngDoCheck(): void {
  }

  ngAfterContentChecked(): void {
    this.currentDay$.subscribe(value => this.selectedDate$.next(
      new Date(this.currentYear$.value,
        this.allMonth.indexOf(this.monthControl.value),
        value)));
    console.log(this.events.some(value =>
      value.startDate.toDateString() === this.sDay));
  }

  currentYear$ = new BehaviorSubject(this.yearsControl.value);
  currentMonth$ = new BehaviorSubject(this.monthControl.value);
  currentDay$ = new BehaviorSubject(new Date().getDate());
  selectedDate$ = new BehaviorSubject(this.today);
  // currentYear$: Observable<number> = this.yearsControl.valueChanges.pipe(
  //   filter((value) => parseInt(value).toString() == value),
  //   map((value) => parseInt(value))
  // );

  // currentMonth$ = this.monthControl.valueChanges.pipe(
  //   // filter((value) => value)
  // );



  // Сделать так чтобы при выборе месяца и года показывалось правильное число дней
  // Подсказка: смотри combineLatest

  // dayInMonth$ = this.currentYear$.pipe(
  //   map((value) => {
  //     if (value % 2 == 0) {
  //       console.log(Array(15).fill(0).map((_, index) => index + 1));
  //       return Array(15).fill(0).map((_, index) => index + 1)
  //     }
  //     return Array(31).fill(0).map((_, index) => index + 1)
  //   })
  // );

  dayInMonth$ = this.currentMonth$.pipe(
    map((value) => {
      // Определяем количество дней в месяца
      return Array(new Date(this.yearsControl.value,
        this.allMonth.indexOf(this.monthControl.value) + 1,
        0).getDate()).fill(0).map((_, index) => index + 1);
    })
  );

  // Сделать список месяцев
  setDay(day: number) {
    this.currentDay$.next(day);
  }

  getSelectedDate(day: number) {

  }

  // Меняет на предыдущий месяц
  prevMonth() {
    if (this.monthControl.value === this.allMonth[0]) {
      this.monthControl.setValue(this.allMonth[this.allMonth.length - 1]);
      this.prevYear();
    } else {
      this.monthControl.setValue(this.allMonth
        [this.allMonth.indexOf(this.monthControl.value) - 1]);
    }
  }

  // Меняет на след месяц
  nextMonth() {
    if (this.monthControl.value === this.allMonth[this.allMonth.length - 1]) {
      this.monthControl.setValue(this.allMonth[0]);
      this.nextYear();
    } else {
      this.monthControl.setValue(this.allMonth
        [this.allMonth.indexOf(this.monthControl.value) + 1]);
    }
  }


  prevYear() {
    this.yearsControl.setValue(this.yearsControl.value - 1);
  }

  nextYear() {
    this.yearsControl.setValue(this.yearsControl.value + 1);
  }
}
