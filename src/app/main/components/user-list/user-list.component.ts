import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IService, IUser } from './../../../core/models/request.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[];
  @Input() services: IService[];
  @Input() selectedUserId: number;
  @Output() selectUserEvent = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit(): void {
  }

  userClickHandler(user: IUser): void {
    this.selectedUserId = user.id;
    this.selectUserEvent.emit(user);
  }
}
