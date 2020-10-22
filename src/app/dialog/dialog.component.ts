import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MaterialModule) { }

  openDialog() {
  }

  ngOnInit(): void {
  }

}
