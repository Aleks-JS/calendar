
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  heroName: string = "Hanzo"

  heroFromInput: string

  heroTimer: string = "bla";

  @ViewChild('input') inputEl:ElementRef;

  heroSubject$ = new BehaviorSubject("Tracer")

  updateHeroName() {
    this.heroName = "Mercy"
    this.heroSubject$.next("Tank")
  }

  ngOnInit() {
    setInterval(() => {
      this.heroTimer += "!!"
    }, 1000)
  }

  ngAfterViewInit() {
    // Почему не работает хотя в html подписка есть(и как бы ты поправил чтобы работало)?
   fromEvent(this.inputEl.nativeElement, 'keypress').pipe(
     map((e: any) => e.target.value + "!"),
   ).subscribe((value)=>{
     this.heroFromInput = value
     console.log(this.heroFromInput)
   })
   // Как бы ты переписал, можно менять html тоже ?(Подсказка FormControl)
  }

}
