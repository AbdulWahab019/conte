import { GenericResponse } from '../api/api.model';

export interface CreateCheckoutSessionAPIRequest {
  success_url: string;
  cancel_url: string;
}

export interface IsUserSubscribedAPIResponse extends GenericResponse {
  data: IsUserSubscribed;
}

export interface IsUserSubscribed {
  is_subscribed: boolean;
}
