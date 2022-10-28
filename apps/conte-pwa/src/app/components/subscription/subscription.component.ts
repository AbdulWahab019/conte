import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { delay, STRIPE_FAIL, STRIPE_SUCCESS } from '../../utils/constants';
import { SubscriptionService } from '../../services/subscription.service';
import { SpinnerService } from '../../services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'conte-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class SubscriptionComponent implements OnInit {
  isSubscribed = false;
  renderingSubscriptionForm = false;
  subscriptionFormRendered = false;
  buttonState = 'static';
  subscriptionState = '';
  message = '';
  sucess = '';
  session_id = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private toast: ToastService,
    private spinner: SpinnerService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      if (params['state'] === 'success') {
        this.subscriptionState = 'success';
        await delay(2000);
        this.router.navigate(['orientation']);
      } else if (params['state'] === 'fail') {
        this.subscriptionState = 'fail';
        await delay(2000);
        this.subscriptionState = ''
      }
    });

    await delay(2000);
    this.renderingSubscriptionForm = true;
    await delay(2000);
    this.subscriptionFormRendered = true;
  }

  confirmSubscription() {
    this.buttonState = 'loading';

    const url_data = {
      success_url: STRIPE_SUCCESS,
      cancel_url: STRIPE_FAIL,
    };

    this.subscriptionService
      .createSubscriptionSession(url_data)
      .then((resp) => {
        window.location.href = resp.data.url;
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
