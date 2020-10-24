//import { CreateRulesService } from './../../createRules.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

const nowDate = new Date();
const dat30MinutesHead = new Date(
  new Date().setMinutes(new Date().getMinutes() + 30)
);

const currentDate =
  nowDate.getFullYear() +
  '-' +
  ('0' + (nowDate.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + nowDate.getDate()).slice(-2);

const currentTime =
  ('0' + nowDate.getHours()).slice(-2) +
  ':' +
  ('0' + nowDate.getMinutes()).slice(-2);

const currentDateEnd =
  dat30MinutesHead.getFullYear() +
  '-' +
  ('0' + (dat30MinutesHead.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + dat30MinutesHead.getDate()).slice(-2);

const currentTimeEnd =
  ('0' + dat30MinutesHead.getHours()).slice(-2) +
  ':' +
  ('0' + dat30MinutesHead.getMinutes()).slice(-2);

// export interface DialogData {
//   startDate: string;
//   endDate: string;
// }

@Component({
  selector: 'app-dialog-forms',
  templateUrl: './dialog-forms.component.html',
  styleUrls: ['./dialog-forms.component.scss']
})
export class DialogFormsComponent implements OnInit {
  form: FormGroup;
  description: string;

  startDate = new FormControl(currentDate);
  startTime = new FormControl(currentTime);
  endDate = new FormControl(currentDateEnd);
  endTime = new FormControl(currentTimeEnd);
  eventDescription = new FormControl();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description],
      startDate: [this.startDate.value],
      startTime: [this.startTime.value],
      endDate: [this.endDate.value],
      endTime: [this.endTime.value],
      eventDescription: [this.eventDescription.value],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  // onSubmit() {
  //   const controls = this.form.controls;
  //
  //   /** TODO: Обработка данных формы */
  //   console.log(this.form.value);
  // }
}
