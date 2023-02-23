export interface TreatmentPlan {
  id: number;
  name: string;
  updatedAt: string;
  surgery: surgery;
  doctor: doctor;
  createdAt: string;
}

export interface TreatmentPlanTableData {
  id: number;
  name: string;
  surgery: string;
  doctor: string;
  createdAt: string;
}

export interface doctor {
  id: number;
  name: string;
}

export interface surgery {
  id: number;
  name: string;
}

export interface TreatmentPlanDetails {
  assigned_at: string;
  createdAt: string;
  details: TreatmnetPlanTaskDetails[];
  id: number;
  name: string;
  tp_id: number;
  updatedAt: string;
  user_id: number;
}

export interface TreatmnetPlanTaskDetails {
  created_at: string;
  tasks: TreatmentPlanTask[];
  tp_date: string;
  tp_day: number;
  tp_weekday: string;
  video_url: string;
  isExpanded?: boolean;
}

export interface TreatmentPlanTaskDetailsForTp {
  tp_day: number;
  tp_weekday: string;
  video_url: string;
  is_uploading?: boolean;
}

export interface TreatmentPlanTask {
  id: number;
  is_completed: boolean;
  is_skipped: boolean;
  task_type: number;
  title: string;
}

export interface UserTreatmentPlanData {
  completed_tasks: number;
  pending_tasks: number;
  skipped_tasks: number;
  userTreatmentPlan: TreatmentPlanDetails;
}

export interface UserTreatmentPlanDataForTp {
  id: number;
  name: string;
  createdAt: string;
  TreatmentPlanDetails: TreatmentPlanTaskDetailsForTp[];
}

export interface Task {
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

export interface taskToTransfer {
  id: number;
  is_completed: boolean;
  is_skipped: boolean;
  task_type: number;
  title: string;
}
