export interface UserDemographics {
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  estimated_max_velocity: number;
}

export interface UpdateUserResponse {
  email: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  estimated_max_velocity: number;
}

export interface GetUserDataApiRes {
  first_name: string;
  last_name: string;
  cell_phone: string;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  estimated_max_velocity: number;
  is_terms_of_use_accepted: boolean;
  is_orientation_video_watched: boolean;
  is_subscribed: boolean;
  num_skipped_tasks: number;
  num_completed_tasks: number;
}
export interface GetUserTasksCalenderAPIRes {
  tp_day: number;
  total_tasks: number;
  date: string;
  selected: boolean;
  day: string;
}
