import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../core/services/data.service';
import { IUserConverted } from './../core/models/request.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  user: IUserConverted;
  isEdited = false;
  isNotifacationDisabled = true;
  settingsForm = new FormGroup({
    userName: new FormControl({value: '', disabled: true}, [Validators.maxLength(200)]),
    psevdo: new FormControl('', [Validators.maxLength(200)]),
    enableNotification: new FormControl(false),
    notification: new FormGroup({
      emailOrPhone: new FormControl('email'),
      email: new FormControl('mail@mail.com', [Validators.maxLength(200), Validators.email]),
      phone: new FormControl({value: '89000000000', disabled: true}, [Validators.maxLength(11), Validators.pattern(/^89\d*$/)])
    })
  });
  notGroupControl = (this.settingsForm.controls.notification as FormGroup).controls;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.user = this.dataService.readUser();
    this.settingsForm.patchValue({
      userName: this.user.name,
      psevdo: this.user.name
    });
    this.settingsForm.controls.notification.disable();

    this.settingsForm.valueChanges.subscribe(({ enableNotification }) => {
      this.isNotifacationDisabled = !enableNotification;
    });
  }

  checkboxHandler(): void {
    const notControl = this.settingsForm.controls.notification;
    if (this.settingsForm.value.enableNotification) {
      notControl.enable();
      notControl.reset({
        emailOrPhone: 'email',
        email: 'mail@mail.com',
        phone: {value: '89000000000', disabled: true}
      });
    } else {
      notControl.disable();
    }
  }

  radioBtnHandler(): void {
    if (this.settingsForm.value.notification.emailOrPhone === 'email') {
      this.notGroupControl.email.enable();
      this.notGroupControl.phone.disable();
    } else {
      this.notGroupControl.email.disable();
      this.notGroupControl.phone.enable();
    }
  }

  setDefault(): void {
    this.settingsForm.reset({
      userName: this.user.name,
      psevdo: this.user.name,
      enableNotification: false,
      notification: {
        emailOrPhone: 'email',
        email: 'mail@mail.com',
        phone: '89000000000',
      }
    });

    this.settingsForm.controls.notification.disable();
  }

  submitForm(): void {
    console.log('submit');
  }

  formInput(): void {
    this.isEdited = true;
  }

  clearPsevdo(): void {
    this.settingsForm.patchValue({ psevdo: '' });
  }

  clearPhone(): void {
    this.settingsForm.patchValue({
      notification: { phone: '' }
    });
  }

  clearEmail(): void {
    this.settingsForm.patchValue({
      notification: { email: ''}
    });
  }
}
