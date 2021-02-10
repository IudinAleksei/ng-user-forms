import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../core/services/session-storage.service';
import { IRequest } from '../core/models/request.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  data: IRequest;

  constructor(private storage: SessionStorageService) { }

  ngOnInit(): void {
    this.data = this.storage.readRequest();
  }
}
