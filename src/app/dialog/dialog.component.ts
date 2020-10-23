import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogFormsComponent } from '../dialog/dialog-forms/dialog-forms.component'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  startDate: any;

  constructor(public dialog: MatDialog) {  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFormsComponent, {
      data: {startDate: this.startDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit(): void {
  }

}
