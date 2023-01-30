import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from '../../modals/generic/generic-modal.component';

@Component({
  selector: 'conte-treatment-plan-table',
  templateUrl: './treatment-plan-table.component.html',
  styleUrls: ['./treatment-plan-table.component.scss'],
})
export class TreatmentPlanTableComponent {
  @Input() updateTaskDetails: (...args: any) => void = () => null;
  @Input() CreateTaskWithTpDay: (...args: any) => void = () => null;
  @Input() postponeTasks: (...args: any) => void = () => null;
  @Input() CreateTask: (...args: any) => void = () => null;
  @Input() transferTask: (...args: any) => void = () => null;
  @Input() updateVideo: (...args: any) => void = () => null;
  @Input() TreatmentPlanData: any = [];
  @Input() buttonState: number = 0;

  constructor(private modalService: NgbModal) {}

  openVideo(url: string, day: string) {
    const modalRef = this.modalService.open(GenericModalComponent, { centered: true });
    modalRef.componentInstance.heading = `Task Video: Day - ${day}`;
    modalRef.componentInstance.videoURL = url;
  }

  onVideoFileSelected = (e: any, tpDay: any) => {
    const index = this.TreatmentPlanData.details.findIndex((x: any) => x.tp_day === tpDay.tp_day);

    this.TreatmentPlanData.details[index].is_uploading = true;
    this.updateVideo(e.files[0], tpDay.tp_day);
  };
  toggleRows(tpDays: any, expanded: boolean) {
    if (expanded) {
      tpDays.forEach((row: any) => {
        row.isExpanded = true;
      });
    } else if (!expanded) {
      tpDays.forEach((row: any) => {
        row.isExpanded = false;
      });
    }
  }
}
