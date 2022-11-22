import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'conte-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  public dateNow = new Date();
  @Input() dDay = new Date('Jan 01 2023 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  timeDifference: any;
  secondsToDday: any;
  minutesToDday: any;
  hoursToDday: any;
  daysToDday: any;

  constructor(private spinner: SpinnerService) {}

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) % this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute)) % this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay)
    );
  }

  ngOnInit() {
    this.subscription = interval().subscribe((x) => {
      this.getTimeDifference();
    });
    this.spinner.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
