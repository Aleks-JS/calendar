import {
  AfterContentChecked,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { EventsService } from './services/events.service';
import { DialogService } from './modules/modals/dialog/dialog.service';
import { ApiService } from './services/api.service';

const currentDate = new Date();
console.log(currentDate.getDay())
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
  ['январь', 'января'], ['февраль', 'февраля'], ['март', 'марта'],
  ['апрель', 'апреля'], ['май', 'мая'], ['июнь', 'июня'],
  ['июль', 'июля'], ['август', 'августа'], ['сентябрь', 'сентября'],
  ['октябрь', 'октября'], ['ноябрь', 'ноября'], ['декабрь', 'декабря']
];

const daysOfTheWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const dayMonth = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  dayInMonth = dayMonth;
  allYears = years;
  allMonth = months;
  allDays = daysOfTheWeek;
  today = currentDate;
  currentDayOfTheWeek = this.today.getDay();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth();
  sDay: string;


  yearsControl = new FormControl(this.currentYear);
  monthControl = new FormControl(this.currentMonth);
  selectedDate$ = new BehaviorSubject(this.today.getDate());
  refresh$ = new Subject();

  draftEvents$ = this.eventsService.getDrafts();

  events$ = this.refresh$.pipe(
    startWith(true),
    switchMap(() => this.apiService.getData()),
    tap(console.log),
    shareReplay(1)
  );

  dayInMonth$ = combineLatest([
    this.yearsControl.valueChanges.pipe(
      startWith(this.currentYear),
    ),
    this.monthControl.valueChanges.pipe(
      startWith(this.currentMonth)
    )
  ]).pipe(
    startWith([this.currentYear, this.currentMonth]),
    map(([year, month]) => {
      const days = this.getBeginningDayOfMonth(year, month) + ((7 - (dayMonth[month] + this.getBeginningDayOfMonth(year, month)) % 7))
      if (year % 4 !== 0) {
        return Array(dayMonth[month] + days).fill(true);
      }
      if (month === 1) {
        return Array(29 + days).fill(true);
      }
      return Array(dayMonth[month] + days).fill(true);
    })
  );

  constructor(
    private eventsService: EventsService,
    private dialogService: DialogService,
    private apiService: ApiService
  ) { }


  remove(id: string) {
    console.log("remove" + id);
    this.eventsService.removeData(id);
    this.eventsService.removeDrafts(id);
    this.refresh$.next();
  }

  setDay(i) {
    this.selectedDate$.next(i);
  }

  prevMonth() {
    if (this.monthControl.value === 0) {
      this.monthControl.setValue(11);
      this.prevYear();
    } else {
      this.monthControl.setValue(this.monthControl.value - 1);
    }
  }

  // Меняет на след месяц
  nextMonth() {
    if (this.monthControl.value === 11) {
      this.monthControl.setValue(0);
      this.nextYear();
    } else {
      this.monthControl.setValue(this.monthControl.value + 1);
    }
  }


  prevYear() {
    this.yearsControl.setValue(this.yearsControl.value - 1);
  }

  nextYear() {
    this.yearsControl.setValue(this.yearsControl.value + 1);
  }

  open(data = {}) {
    this.dialogService.open(data).subscribe(() => {
      this.refresh$.next()
    })
  }

  getBeginningDayOfMonth(year, month) {
    if (new Date(`${year}-${month + 1}-1`).getDay() === 0) {
      return 6
    };
    return new Date(`${year}-${month + 1}-1`).getDay() - 1;
  }
}
