import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserConverted } from './../../../core/models/request.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @Input() users: IUserConverted[];
  @Output() selectUserEvent = new EventEmitter<IUserConverted>();

  constructor() { }

  ngOnInit(): void {
  }

  userClickHandler(user: IUserConverted): void {
    this.selectUserEvent.emit(user);
  }
}
