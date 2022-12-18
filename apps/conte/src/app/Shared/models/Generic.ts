export interface TableHeaders {
  title: string;
  value: string;
  sort: boolean;
}
export interface NavbarComponentModel {
  title: string;
  activePath: string;
  svgSrc: string;
  activeSvgSrc: string;
}
export interface TreatmentPlan {
  id: number;
  name: string;
  surgery_id: number;
  doctor_id: number;
  createdAt: string;
}
export interface TreatmentPlanDetails {
  assigned_at: string;
  createdAt: string;
  details: any;
  id: number;
  name: string;
  tp_id: number;
  updatedAt: string;
  user_id: number;
}

export interface Tasks {
  createdAt: string;
  id: number;
  is_completed: boolean;
  is_skipped: boolean;
  task_type: number;
  title: string;
  tp_day: number;
  updatedAt: string;
  user_id: number;
  user_tp_id: number;
}
