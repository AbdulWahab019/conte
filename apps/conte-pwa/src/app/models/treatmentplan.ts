export interface taskFeedback {
  question: string;
  answer: string;
}

export interface submitFeedbackData {
  QA: taskFeedback[];
  task_id: number;
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
