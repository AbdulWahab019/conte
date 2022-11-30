export interface CreateCheckoutSessionAPIReq {
  success_url: string;
  cancel_url: string;
}

export interface IsUserSubscribedAPIRes {
  is_subscribed: boolean;
}
