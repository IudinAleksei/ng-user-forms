import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../core/services/request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.requestService.getUsersAndSettings()
      .subscribe(
        res => console.log(res),
        err => {
        this.router.navigate(['error']);
        console.warn('HTTP Error: ', err);
        }
      );
  }

}
