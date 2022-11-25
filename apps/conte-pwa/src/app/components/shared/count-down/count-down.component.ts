import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { SpinnerService } from '../../../services/spinner.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { delay } from '../../../utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'conte-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class CountDownComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  public dateNow = new Date();
  @Input() dDay = new Date('Jan 01 2023 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;
  showTimer!: boolean;

  timeDifference!: number;
  secondsToDday!: number;
  minutesToDday!: number;
  hoursToDday!: number;
  daysToDday!: number;

  constructor(private spinner: SpinnerService, private router: Router) {}

  async ngOnInit() {
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
      if (this.timeDifference <= 0) this.showTimer = false;
    });

    await delay(2000);
    if (this.timeDifference <= 0) this.showTimer = false;
    else this.showTimer = true;

    this.spinner.hide();
  }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
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

  navToDashboard() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
