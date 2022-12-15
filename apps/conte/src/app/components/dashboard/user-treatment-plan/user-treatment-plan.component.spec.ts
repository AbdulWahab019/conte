import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTreatmentPlanComponent } from './user-treatment-plan.component';

describe('UserTreatmentPlanComponent', () => {
  let component: UserTreatmentPlanComponent;
  let fixture: ComponentFixture<UserTreatmentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTreatmentPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTreatmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
