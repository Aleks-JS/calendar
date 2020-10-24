import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogFormsComponent } from '../dialog/dialog-forms/dialog-forms.component'
import { EventsService } from '../events.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  startDate: any;

  constructor(public dialog: MatDialog, private eventsService: EventsService) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig(); // Конфигурация диалогового окна
    dialogConfig.position = { // Задаем расположение окна на странице
      top: '52px',
      left: '52px'
    };


    const dialogRef = this.dialog.open(DialogFormsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.eventsService.setData(result);
      console.log(this.eventsService.get());

      console.log(result);
    });
  }

  ngOnInit(): void {
  }

}
