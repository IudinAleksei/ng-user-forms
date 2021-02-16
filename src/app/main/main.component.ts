import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser, IService } from './../core/models/request.model';
import { DataService } from '../core/services/data.service';
import { RequestService } from '../core/services/request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  users: IUser[];
  selectedUser: IUser;
  services: IService[];

  constructor(
    private requestService: RequestService, private dataService: DataService,
    private router: Router, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUsers();

    const requestServices: Subscription = this.requestService.getServices()
        .subscribe(
          res => {
            this.services = res;
            this.cdr.detectChanges();
          },
          err => {
            this.router.navigate(['error']);
            console.warn('HTTP Error: ', err);
            requestServices.unsubscribe();
          },
          () => requestServices.unsubscribe()
      );
  }

  selectUser(user: IUser): void {
    this.selectedUser = user;

    this.dataService.writeUser(user.id);
    this.cdr.detectChanges();
  }

  getUsers(): void {
    const requestUsers: Subscription = this.requestService.getAllUsers()
        .subscribe(
          res => {
            this.users = res;
            this.selectedUser = this.users[this.dataService.readUser() - 1];
            this.cdr.detectChanges();
          },
          err => {
            this.router.navigate(['error']);
            console.warn('HTTP Error: ', err);
            requestUsers.unsubscribe();
          },
          () => requestUsers.unsubscribe()
    );
  }

  updateServices(): void {
    this.getUsers();
  }
}
