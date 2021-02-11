import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRequest, IUserConverted } from './core/models/request.model';
import { DataService } from './core/services/data.service';
import { RequestService } from './core/services/request.service';
import { SessionStorageService } from './core/services/session-storage.service';
import { ConvertDataService } from './core/services/convert-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  data: IRequest;

  constructor(
    private requestService: RequestService, private storage: SessionStorageService,
    private router: Router, private dataService: DataService,
    private convertDataservice: ConvertDataService
  ) { }

  ngOnInit(): void {
    const storageData: IUserConverted[] | null = this.storage.readRequest();

    if (!storageData) {
      const request: Subscription = this.requestService.getUsersAndSettings()
        .subscribe(
          res => {
            this.data = res;
            const covertedUsers = this.convertDataservice.convertData(res);
            this.storage.writeRequest(covertedUsers);
            this.dataService.writeRequest(covertedUsers);
            this.dataService.writeUser(covertedUsers[0]);
          },
          err => {
            this.router.navigate(['error']);
            console.warn('HTTP Error: ', err);
          },
          () => request.unsubscribe()
      );
    } else {
      this.dataService.writeRequest(storageData);
      this.dataService.writeUser(storageData[0]);
    }
  }
}
