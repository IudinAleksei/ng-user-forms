import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
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
export class MainComponent implements OnInit, OnChanges {
  users: IUser[];
  selectedUser: IUser;
  services: IService[];

  constructor(
    private requestService: RequestService, private dataService: DataService,
    private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('change main');
  }

  ngOnInit(): void {
    console.log('init  main');
    const requestUsers: Subscription = this.requestService.getAllUsers()
        .subscribe(
          res => {
            this.users = res;
            this.selectedUser = this.users[0];
            this.cdr.detectChanges();
          },
          err => {
            this.router.navigate(['error']);
            console.warn('HTTP Error: ', err);
          },
          () => requestUsers.unsubscribe()
    );

    const requestServices: Subscription = this.requestService.getServices()
        .subscribe(
          res => {
            this.services = res;
            this.cdr.detectChanges();
          },
          err => {
            this.router.navigate(['error']);
            console.warn('HTTP Error: ', err);
          },
          () => requestServices.unsubscribe()
      );
  }

  selectUser(user: IUser): void {
    this.selectedUser = user;
    this.cdr.detectChanges();
    // this.dataService.writeUser(user.id);
  }
}
