import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../core/models/request.model';
import { DataService } from '../core/services/data.service';
import { RequestService } from '../core/services/request.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsComponent implements OnInit {
  userId = 1;
  user: IUser;
  isEdited = false;
  isNotifacationDisabled = true;
  settingsForm = new FormGroup({
    userName: new FormControl({value: '', disabled: true}, [Validators.maxLength(200)]),
    psevdo: new FormControl('', [Validators.maxLength(200)]),
    enableNotification: new FormControl(false),
    notification: new FormGroup({
      type: new FormControl('email'),
      email: new FormControl('mail@mail.com', [Validators.maxLength(200), Validators.email]),
      phone: new FormControl({value: '89000000000', disabled: true}, [Validators.maxLength(11), Validators.pattern(/^89\d*$/)])
    })
  });
  notGroupControl = (this.settingsForm.controls.notification as FormGroup).controls;

  constructor(
    private requestService: RequestService, private dataService: DataService,
    private router: Router, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userId = this.dataService.readUser();

    const requestUser: Subscription = this.requestService.getUser(this.userId)
        .subscribe(
          res => {
            this.user = res;

            this.settingsForm.patchValue({
              userName: this.user.name,
              psevdo: this.user.name
            });

            this.cdr.detectChanges();
          },
          err => {
            this.router.navigate(['error']);
            console.warn('HTTP Error: ', err);
          },
          () => requestUser.unsubscribe()
    );


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
        type: 'email',
        email: 'mail@mail.com',
        phone: {value: '89000000000', disabled: true}
      });
    } else {
      notControl.disable();
    }
  }

  radioBtnHandler(): void {
    if (this.settingsForm.value.notification.type === 'email') {
      this.notGroupControl.email.enable();
      this.notGroupControl.phone.disable();
    } else {
      this.notGroupControl.email.disable();
      this.notGroupControl.phone.enable();
    }
  }

  setDefault(): void {
    this.isEdited = false;
    this.settingsForm.reset({
      userName: this.user.name,
      psevdo: this.user.name,
      enableNotification: false,
      notification: {
        type: 'email',
        email: 'mail@mail.com',
        phone: '89000000000',
      }
    });

    this.settingsForm.controls.notification.disable();
  }

  submitForm(): void {
    const body = { id: this.userId, name: this.user.name, ...this.settingsForm.value };
    this.requestService.setSettings(body)
      .subscribe((val) => console.log('response: ', val));
  }

  formInput(): void {
    this.isEdited = true;
  }

  clearPsevdo(): void {
    this.isEdited = true;
    this.settingsForm.patchValue({ psevdo: '' });
  }

  clearPhone(): void {
    this.isEdited = true;
    this.settingsForm.patchValue({
      notification: { phone: '' }
    });
  }

  clearEmail(): void {
    this.isEdited = true;
    this.settingsForm.patchValue({
      notification: { email: ''}
    });
  }
}
