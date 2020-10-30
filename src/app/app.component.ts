import { DialogService } from './modules/modals/dialog/dialog.service';
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

  allYears = years;
  allMonth = months;
  today = currentDate;
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
    switchMap(() => this.eventsService.getData())
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
      if (year % 4 !== 0) {
        return Array(dayMonth[month]).fill(true);
      }
      if (month === 1) {
        return Array(29).fill(true);
      }
      return Array(dayMonth[month]).fill(true);
    }));

  constructor(
    private eventsService: EventsService,
    private dialogService: DialogService
  ) { }


  remove(id: string) {
    console.log("remove" + id);
    this.eventsService.removeData(id);
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
}
