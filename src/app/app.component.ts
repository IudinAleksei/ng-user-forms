import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRequest } from './core/models/request.model';
import { RequestService } from './core/services/request.service';
import { SessionStorageService } from './core/services/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  data: IRequest;

  constructor(private requestService: RequestService, private storage: SessionStorageService, private router: Router) { }

  ngOnInit(): void {

    const storageData: IRequest | null = this.storage.readRequest();
    if (!storageData) {
      this.requestService.getUsersAndSettings()
      .subscribe(
        res => {
          this.data = res;
          this.storage.writeRequest(res);
        },
        err => {
        this.router.navigate(['error']);
        console.warn('HTTP Error: ', err);
        }
      );
    } else {
      this.data = storageData;
    }
  }
}
