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
  isEdited = false;
  settingsForm = new FormGroup({
    userName: new FormControl({value: '', disabled: true}, Validators.maxLength(200)),
    psevdo: new FormControl('', Validators.maxLength(200)),
    notification: new FormGroup({
      enableNotification: new FormControl(false),
      enableEmail: new FormControl({value: 'email', checked: true}),
      email: new FormControl('mail@mail.com'),
      enablePhone: new FormControl({value: 'phone', checked: false}),
      phone: new FormControl('89000000000')
    }),
    discard: new FormControl(),
    save: new FormControl()
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.user = this.dataService.readUser();
    this.settingsForm.patchValue({
      userName: this.user.name,
      psevdo: this.user.name,
    });
  }

  formInput(): void {
    this.isEdited = true;
  }

  clearPsevdo(): void {
    this.settingsForm.patchValue({
      psevdo: '',
    });
  }

  clearPhone(event: Event): void {
    event.preventDefault();
    this.settingsForm.patchValue({
      notification: {
        phone: ''
      },
    });
  }

  clearEmail(event: Event): void {
    event.preventDefault();
    this.settingsForm.patchValue({
      notification: {
        email: ''
      },
    });
  }
}
