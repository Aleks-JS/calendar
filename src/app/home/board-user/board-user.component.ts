import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../shared/event-bus.service';
import { EventBus } from '../../shared/event-bus.class';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = err.error.message || err.error || err.message;

        if (err.status === 403) {
          this.eventBusService.emit(new EventBus('logout', null));
        }
      }
    );
  }
}
