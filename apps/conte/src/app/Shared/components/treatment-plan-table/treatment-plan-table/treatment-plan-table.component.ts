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

  ngOnInit(): void {}

  openVideo(link: string) {
    window.open(link);
  }

  onVideoFileSelected = (e:any , tpDays: any) => {
    this.updateVideo(e.files[0],tpDays.tp_day)
  };
}
