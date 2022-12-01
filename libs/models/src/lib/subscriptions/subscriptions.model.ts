import { GenericResponse } from '../api/api.model';
import Stripe from 'stripe';

export interface CreateCheckoutSessionAPIRequest {
  success_url: string;
  cancel_url: string;
}

export type CreateCheckoutSessionAPIResponse = Stripe.Response<Stripe.Checkout.Session>;

export interface IsUserSubscribedAPIResponse extends GenericResponse {
  data: IsUserSubscribed;
}

export interface IsUserSubscribed {
  is_subscribed: boolean;
}
