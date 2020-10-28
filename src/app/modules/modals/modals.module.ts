import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { DialogFormsComponent } from './dialog/dialog-component/form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';



const MaterialComponents = [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
];

@NgModule({
    imports: [MaterialComponents, ReactiveFormsModule, CommonModule],
    exports: [],
    providers: [DialogService],
    declarations: [DialogFormsComponent],
    entryComponents: [DialogFormsComponent]
})
export class ModalsModule { }
