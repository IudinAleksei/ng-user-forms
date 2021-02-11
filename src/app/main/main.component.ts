import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../core/services/session-storage.service';
import { IUserConverted } from './../core/models/request.model';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  users: IUserConverted[];
  selectedUser: IUserConverted;

  constructor(private storage: SessionStorageService, private dataService: DataService) { }

  ngOnInit(): void {
    this.users = this.dataService.readRequest();
    this.selectedUser = this.dataService.readUser();
  }

  selectUser(user: IUserConverted): void {
    this.selectedUser = user;
    this.dataService.writeUser(user);
  }
}
