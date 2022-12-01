export interface taskFeedback {
  question: string;
  answer: string;
}

export interface submitFeedbackData {
  QA: taskFeedback[];
  task_id: number;
}

export interface dailyData {
  tp_day: number;
  total_tasks: number;
  completed_tasks: number;
  skipped_tasks: number;
  date: string;
  selected: boolean;
  day: string;
}

export interface therapyTask {
  id: number;
  user_id: number;
  user_tp_id: number;
  title: string;
  tp_day: number;
  is_completed: string | boolean;
  is_skipped: boolean;
  task_type: number;
  feedback: any;
  createdAt: string;
  updatedAt: string;
}
