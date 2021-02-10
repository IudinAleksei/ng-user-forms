import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  settingsForm: FormGroup;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.user = this.dataService.readUser();
    this.settingsForm = new FormGroup({
      userName: new FormControl({value: this.user.name, disabled: true}, Validators.maxLength(200)),
      psevdo: new FormControl(this.user.name, Validators.maxLength(200)),
      notification: new FormGroup({
        enableNotification: new FormControl('checked'),
        // enableEmail: new FormControl({value: 'email', checked: true}),
        // email: new FormControl('mail@mail.com'),
        // enablePhone: new FormControl({value: 'phone', checked: false}),
        // phone: new FormControl('89000000000')
      }),
      // discard: new FormControl(),
      // save: new FormControl()
    });
  }
}
