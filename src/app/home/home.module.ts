import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home.component';
import { BoardUserComponent } from './board-user/board-user.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    BoardUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
