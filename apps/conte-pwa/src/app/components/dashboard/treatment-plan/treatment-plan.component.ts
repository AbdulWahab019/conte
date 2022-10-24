import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from '../../../utils/constants';

@Component({
  selector: 'conte-treatment-plan',
  templateUrl: './treatment-plan.component.html',
  styleUrls: ['./treatment-plan.component.scss'],
})
export class TreatmentPlanComponent implements OnInit {
  @Input() date = new Date().toLocaleDateString();
  buttonState = 'static';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navBack() {
    this.router.navigate(['dashboard']);
  }

  async completeTherapy() {
    this.buttonState = 'loading';
    await delay(1600);
    this.buttonState = 'static';
  }
}
