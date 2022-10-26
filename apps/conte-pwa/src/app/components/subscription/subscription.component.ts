import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { delay } from '../../utils/constants';

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
  checkoutState = 'static';
  message = '';
  sucess = '';
  session_id = '';

  constructor() {}

  async ngOnInit(): Promise<void> {
    const query = new URLSearchParams(window.location.search);

    await delay(2000);
    this.renderingSubscriptionForm = true;
    await delay(2000);
    this.subscriptionFormRendered = true;
  }

  confirmCheckout() {
    this.checkoutState = 'loading';
  }
}
