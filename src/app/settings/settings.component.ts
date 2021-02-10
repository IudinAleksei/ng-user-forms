import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUser } from '../core/models/request.model';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  user: IUser;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.user = this.dataService.readUser();
  }
}
