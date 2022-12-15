import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentplansComponent } from './treatmentplans.component';

describe('TreatmentplansComponent', () => {
  let component: TreatmentplansComponent;
  let fixture: ComponentFixture<TreatmentplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatmentplansComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreatmentplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
