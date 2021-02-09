import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RequestService } from '../core/services/request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getUsersAndSettings()
      .subscribe(res => console.log(res));
  }

}
