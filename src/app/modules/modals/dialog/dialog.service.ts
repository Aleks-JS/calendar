import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogFormsComponent } from './dialog-component/form.component';

@Injectable()
export class DialogService {
    constructor(private dialog: MatDialog) { }
    open(data) {
        return this.dialog.open(DialogFormsComponent, { data }).afterClosed();
    }
}