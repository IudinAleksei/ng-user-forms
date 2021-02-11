import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRequest } from './core/models/request.model';
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
    private convertDataservice: ConvertDataService) { }

  ngOnInit(): void {
    const storageData: IRequest | null = this.storage.readRequest();

    if (!storageData) {
      const request: Subscription = this.requestService.getUsersAndSettings()
        .subscribe(
        res => {
          this.data = res;
          this.storage.writeRequest(res);
          this.dataService.writeRequest(res);
          this.dataService.writeUser(res.users[0]);
          this.convertDataservice.convertData(res);
        },
        err => {
          this.router.navigate(['error']);
          console.warn('HTTP Error: ', err);
        },
        () => request.unsubscribe()
      );
    } else {
      this.data = storageData;
      this.dataService.writeRequest(this.data);
      this.dataService.writeUser(this.data.users[0]);
    }
  }
}
