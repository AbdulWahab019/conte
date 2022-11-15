import { Component, Input, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'apps/conte-pwa/src/app/services/toast.service';
import { TreatmentPlanService } from 'apps/conte-pwa/src/app/services/treatment-plan.service';

@Component({
  selector: 'conte-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  @ViewChild('commentContainer') private commentContainer: ElementRef = {} as ElementRef;
  @Input() task: any = {};
  @Input() dueDate = '';
  buttonState = 'static';
  sendButtonState = 'static';
  comment: string = '';
  comments: any = [];

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    public activeModal: NgbActiveModal,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.comments?.length) {
        this.commentContainer.nativeElement.scrollTop = this.commentContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error(err);
    }
  }

  addComment() {
    this.sendButtonState = 'loading';
    // this.comments.push(this.comment);
  }

  completeDailyTask() {
    this.buttonState = 'loading';
    const status = !this.task.is_completed;
    const task_id = this.task.id;

    this.treatmentPlanService
      .updateTask(task_id, status)
      .then((resp) => {
        this.buttonState = 'static';
        const updatedTask = {
          status,
          task_id,
        };

        this.activeModal.close(updatedTask);
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
