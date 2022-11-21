export interface taskFeedback {
    question: string;
    answer: string;
  }
  
export interface submitFeedbackData{
  QA: taskFeedback[];
  task_id: number;
}