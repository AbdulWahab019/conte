import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPlanTableComponent } from './treatment-plan-table.component';

describe('TreatmentPlanTableComponent', () => {
  let component: TreatmentPlanTableComponent;
  let fixture: ComponentFixture<TreatmentPlanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatmentPlanTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreatmentPlanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
