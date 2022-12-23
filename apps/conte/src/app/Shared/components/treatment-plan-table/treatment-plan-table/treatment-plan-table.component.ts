import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'conte-treatment-plan-table',
  templateUrl: './treatment-plan-table.component.html',
  styleUrls: ['./treatment-plan-table.component.scss'],
})
export class TreatmentPlanTableComponent implements OnInit {
  // @ViewChild('Videofile') input: ElementRef<HTMLInputElement> = {} as ElementRef;
  constructor() {}
  @Input() updateTask: (...args: any) => void = () => null;
  @Input() updateVideo: (...args: any) => void = () => null;
  @Input() userTreatmentPlan: any = [];
  @Input() buttonState: number = 0;

  ngOnInit(): void {
    console.log(this.userTreatmentPlan);
  }

  openVideo(link: string) {
    window.open(link);
  }

  onVideoFileSelected = (e: any, tpDay: any) => {
    const index = this.userTreatmentPlan.details.findIndex((x: any) => x.tp_day === tpDay.tp_day);

    this.userTreatmentPlan.details[index].is_uploading = true;
    this.updateVideo(e.files[0], tpDay.tp_day);
  };
}
