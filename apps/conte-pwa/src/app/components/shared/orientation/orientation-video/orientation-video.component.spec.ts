import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationVideoComponent } from './orientation-video.component';

describe('OrientationVideoComponent', () => {
  let component: OrientationVideoComponent;
  let fixture: ComponentFixture<OrientationVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrientationVideoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrientationVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
