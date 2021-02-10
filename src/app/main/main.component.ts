import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../core/services/session-storage.service';
import { IRequest } from '../core/models/request.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  data: IRequest;

  constructor(private storage: SessionStorageService) { }

  ngOnInit(): void {
    this.data = this.storage.readRequest();
  }
}
