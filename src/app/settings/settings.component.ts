import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription} from 'rxjs';
import { IUser, ISettings } from './../core/models/request.model';
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
  userSettings: ISettings;
  isEdited = false;
  isNotifacationDisabled = true;
  alreadyOnServer = false;

  defaultUserSettings = {
    id: 1,
    name: '',
    psevdo: '',
    enableNotification: false,
    notification: {
      type: 'email',
      email: ''
    }
  };

  settingsForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, [Validators.maxLength(200)]),
    psevdo: new FormControl('', [Validators.maxLength(200)]),
    enableNotification: new FormControl(false),
    notification: new FormGroup({
      type: new FormControl('email'),
      email: new FormControl('mail@mail.com'),
      phone: new FormControl({value: '89000000000', disabled: true})
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

            this.defaultUserSettings = {
              ...this.defaultUserSettings,
              name: this.user.name,
              psevdo: this.user.name
            };

            this.cdr.detectChanges();
          },
          err => {
            this.router.navigate(['error']);
            console.warn('HTTP Error: ', err);
            requestUser.unsubscribe();
          },
          () => requestUser.unsubscribe()
      );

    const requestSettings: Subscription = this.requestService.getSettings(this.userId)
        .subscribe(
          res => {
            this.userSettings = res;
            this.alreadyOnServer = true;

            this.cdr.detectChanges();
          },
          err => {
            if (err.status === 404) {
              this.alreadyOnServer = false;
              this.userSettings = { ...this.defaultUserSettings };
              this.settingsForm.patchValue({
                ...this.userSettings
              });
              this.radioBtnHandler();
            } else {
              this.router.navigate(['error']);
              console.warn('HTTP Error: ', err);
            }
            requestSettings.unsubscribe();
          },
          () => {
            this.settingsForm.patchValue({
              ...this.userSettings
            });
            this.radioBtnHandler();
            requestSettings.unsubscribe();
          }
    );

    this.settingsForm.valueChanges.subscribe(({ enableNotification }) => {
      this.isNotifacationDisabled = !enableNotification;
    });
  }

  checkboxHandler(): void {
    const notControl = this.settingsForm.controls.notification;
    if (this.settingsForm.value.enableNotification) {
      notControl.enable();
      this.radioBtnHandler();
    } else {
      notControl.disable();
    }
  }

  radioBtnHandler(): void {
    if (this.settingsForm.value.notification.type === 'email') {
      this.notGroupControl.email.enable();
      this.notGroupControl.email.setValidators([Validators.required, Validators.maxLength(200), Validators.email]);
      this.notGroupControl.phone.disable();
    } else {
      this.notGroupControl.email.disable();
      this.notGroupControl.phone.enable();
      this.notGroupControl.phone.setValidators([Validators.required, Validators.maxLength(11), Validators.pattern(/^89\d*$/)]);
    }
  }

  setDefault(): void {
    this.isEdited = false;
    this.settingsForm.reset({
      ...this.userSettings
      });
  }

  submitForm(): void {
    const body = { id: this.userId, name: this.user.name, ...this.settingsForm.value };
    let updateMethod: Observable<ISettings>;

    if (this.alreadyOnServer) {
      updateMethod = this.requestService.updateSettings(this.userId, body);
    } else {
      updateMethod = this.requestService.setSettings(body);
    }

    const updateRequest = updateMethod
      .subscribe(
        res => {
          this.userSettings = res;

          this.cdr.detectChanges();
        },
        err => {
          if (err.status === 404) {
            this.userSettings = {...this.defaultUserSettings};
          }
          this.settingsForm.patchValue({
            ...this.userSettings
          });
          updateRequest.unsubscribe();

          console.warn('HTTP Error: ', err);
        },
        () => {
          this.settingsForm.patchValue({
            ...this.userSettings
          });
          updateRequest.unsubscribe();
        }
    );
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
