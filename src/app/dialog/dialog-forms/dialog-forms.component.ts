import {FormGroup, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

import {Component, Inject, OnInit} from '@angular/core';

// tslint:disable-next-line:max-line-length
const nowDate = new Date();
const dat30MinutesHead = new Date(new Date().setMinutes(new Date().getMinutes() + 30));

console.log(dat30MinutesHead);

const currentDate = nowDate.getFullYear()
  + '-' + (('0' + (nowDate.getMonth() + 1))).slice(-2)
  + '-' + ('0' + nowDate.getDate()).slice(-2);

const currentTime = ('0' + nowDate.getHours()).slice(-2)
  + ':' + ('0' + nowDate.getMinutes()).slice(-2);
console.log(currentTime);

const currentDateEnd = dat30MinutesHead.getFullYear()
  + '-' + (('0' + (dat30MinutesHead.getMonth() + 1))).slice(-2)
  + '-' + ('0' + dat30MinutesHead.getDate()).slice(-2);

const currentTimeEnd = ('0' + dat30MinutesHead.getHours()).slice(-2)
  + ':' + ('0' + (dat30MinutesHead.getMinutes())).slice(-2);

export interface DialogData {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-dialog-forms',
  templateUrl: './dialog-forms.component.html',
  styleUrls: ['./dialog-forms.component.scss']
})
export class DialogFormsComponent implements OnInit {


  startDate = new FormControl(currentDate);
  startTime = new FormControl(currentTime);
  endDate = new FormControl(currentDateEnd);
  endTime = new FormControl(currentTimeEnd);
  eventDescription = new FormControl();


  dialogConfig: MatDialogConfig;

  constructor(public dialogRef: MatDialogRef<DialogFormsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    console.log(this.startDate.value);
  }

}
