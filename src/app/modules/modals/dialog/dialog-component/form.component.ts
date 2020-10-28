import { EventsService } from '@services/events.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

const nowDate = new Date();
const nowDateAfter = new Date(
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
    nowDateAfter.getFullYear() +
    '-' +
    ('0' + (nowDateAfter.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + nowDateAfter.getDate()).slice(-2);

const currentTimeEnd =
    ('0' + nowDateAfter.getHours()).slice(-2) +
    ':' +
    ('0' + nowDateAfter.getMinutes()).slice(-2);


@Component({
    selector: 'app-dialog-forms',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class DialogFormsComponent {

    form = this.fb.group({
        startDate: [currentDate],
        startTime: [currentTime],
        endDate: [currentDateEnd],
        endTime: [currentTimeEnd],
        eventDescription: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogFormsComponent>,
        private eventsServise: EventsService,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    close() {
        this.dialogRef.close();
    }

    save() {
        console.log(this.form.valid);
        if (!this.form.valid) {
            console.log(this.form.valid);

            return
        }
        this.eventsServise.addData({
            startDate: new Date('' + this.form.value.startDate + 'T' + this.form.value.startTime + ':00'),
            endDate: new Date('' + this.form.value.endDate + 'T' + this.form.value.endTime + ':00'),
            text: this.form.value.eventDescription
        });
        this.close();
    }

}
