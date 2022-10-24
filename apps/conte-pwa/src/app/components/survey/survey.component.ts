import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from '../../utils/constants';
import { SubmitQuestionnaire, SubmitQuestionnaireAPIRequest } from '@conte/models';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { doctor } from '../models/doctor';
import { surgery } from '../models/surgery';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'conte-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class SurveyComponent implements OnInit {
  surgeryOptionState = 'static';
  nonSurgeryOptionState = 'static';
  surveyScreen = true;
  surgeryQuestionnaire = false;
  nonSurgeryQuestionnaire = false;
  doctors: doctor[] = [];
  surgeries: surgery[] = [];
  surgeryForm: FormGroup = {} as FormGroup;
  nonSurgeryForm: FormGroup = {} as FormGroup;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  navBack() {
    this.surgeryQuestionnaire = false;
    this.nonSurgeryQuestionnaire = false;
    this.surveyScreen = true;
  }

  renderSurgeryForm = async () => {
    this.surgeryOptionState = 'loading';

    this.surveyService
      .getAllDoctors()
      .then((resp) => {
        this.doctors = resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    await delay(1500);

    this.surgeryForm = this.formBuilder.group({
      surgery_date: new FormControl('', [Validators.required]),
      primary_surgery: new FormControl('', [Validators.required]),
      secondary_surgery: new FormControl('', []),
      doctor: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      estimated_max_velocity: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      cell_phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{10,12}')]),
      birth_date: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(5)]),
    });

    this.surveyScreen = false;
    this.surgeryOptionState = 'static';
    this.surgeryQuestionnaire = true;
  };

  get f(): any {
    return this.surgeryForm.controls;
  }

  getSurgeriesAndAssignPosition(doctor_id: string, form: string) {
    this.spinnerService.show();
    this.surveyService
      .getSurgeriesForDoctor(doctor_id)
      .then((resp) => {
        const index = this.doctors.findIndex((doctor) => doctor.id == doctor_id);
        if (form === 'surgery') this.f.position.setValue(this.doctors[index].position);
        else this.f2.position.setValue(this.doctors[index].position);

        this.surgeries = resp.data;
        console.log(this.surgeries)
        this.spinnerService.hide();
      })
      .catch((err) => {
        this.spinnerService.hide();
        console.error(err);
      });
  }

  confirmSurgeryForm() {
    this.surgeryOptionState = 'loading';

    const surgery_date = new Date(
      this.f.surgery_date.value.year,
      this.f.surgery_date.value.month,
      this.f.surgery_date.value.day
    );

    const birth_date = new Date(
      this.f.birth_date.value.year,
      this.f.birth_date.value.month,
      this.f.birth_date.value.day
    );

    const doctor = this.doctors[this.doctors.findIndex((doctor) => doctor.id == this.f.doctor.value)].name;
    const primary_surgery =
      this.surgeries[this.surgeries.findIndex((doctor) => doctor.id == this.f.primary_surgery.value)].name;
    const secondary_surgery =
      this.surgeries[this.surgeries.findIndex((doctor) => doctor.id == this.f.secondary_surgery.value)].name;

    const data: SubmitQuestionnaire[] = [
      { id: 1, response: surgery_date },
      { id: 2, response: primary_surgery },
      { id: 4, response: doctor },
      { id: 5, response: this.f.position.value },
      { id: 6, response: this.f.estimated_max_velocity.value },
      { id: 7, response: this.f.first_name.value },
      { id: 8, response: this.f.last_name.value },
      { id: 9, response: this.f.cell_phone.value },
      { id: 10, response: birth_date },
      { id: 11, response: this.f.address.value },
      { id: 12, response: this.f.city.value },
      { id: 13, response: this.f.state.value },
      { id: 14, response: this.f.zip.value },
    ];

    if (this.f.secondary_surgery.value) data.push({ id: 3, response: secondary_surgery });

    const body: SubmitQuestionnaireAPIRequest = { data, doctor_id: this.f.doctor.value };

    this.surveyService
      .submitQuestionnaire(body)
      .then((resp) => {
        localStorage.setItem('questionnaire_submitted', true.toString());
        this.surgeryOptionState = 'static';

        this.toastService.show('Questionnaire submitted successfully.', {
          classname: 'bg-success text-light',
          icon: 'success',
        });

        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        console.error(err);
        this.surgeryOptionState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }

  renderNonSurgeryForm = async () => {
    this.nonSurgeryOptionState = 'loading';

    this.surveyService
      .getAllDoctors()
      .then((resp) => {
        this.doctors = resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    await delay(1500);

    this.nonSurgeryForm = this.formBuilder.group({
      injury_date: new FormControl('', [Validators.required]),
      injury: new FormControl('', [Validators.required]),
      doctor: new FormControl('', [Validators.required]),
      doctor_dictation: new FormControl('', []),
      position: new FormControl('', [Validators.required]),
      estimated_max_velocity: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      cell_phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{10,12}')]),
      birth_date: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(5)]),
    });

    this.surveyScreen = false;
    this.nonSurgeryOptionState = 'static';
    this.nonSurgeryQuestionnaire = true;
  };

  get f2(): any {
    return this.nonSurgeryForm.controls;
  }

  confirmNonSurgeryForm() {
    this.nonSurgeryOptionState = 'loading';

    const injury_date = new Date(
      this.f2.injury_date.value.year,
      this.f2.injury_date.value.month,
      this.f2.injury_date.value.day
    );

    const birth_date = new Date(
      this.f2.birth_date.value.year,
      this.f2.birth_date.value.month,
      this.f2.birth_date.value.day
    );

    const doctor = this.doctors[this.doctors.findIndex((doctor) => doctor.id == this.f2.doctor.value)].name;

    const data: SubmitQuestionnaire[] = [
      { id: 20, response: injury_date },
      { id: 21, response: this.f2.injury.value },
      { id: 22, response: doctor },
      { id: 23, response: this.f2.doctor_dictation.value },
      { id: 24, response: this.f2.position.value },
      { id: 25, response: this.f2.estimated_max_velocity.value },
      { id: 26, response: this.f2.first_name.value },
      { id: 27, response: this.f2.last_name.value },
      { id: 28, response: this.f2.cell_phone.value },
      { id: 29, response: birth_date },
      { id: 30, response: this.f2.address.value },
      { id: 31, response: this.f2.city.value },
      { id: 32, response: this.f2.state.value },
      { id: 33, response: this.f2.zip.value },
    ];

    const body: SubmitQuestionnaireAPIRequest = { data, doctor_id: this.f2.doctor.value };

    this.surveyService
      .submitQuestionnaire(body)
      .then((resp) => {
        localStorage.setItem('questionnaire_submitted', true.toString());
        this.nonSurgeryOptionState = 'static';

        this.toastService.show('Questionnaire submitted successfully.', {
          classname: 'bg-success text-light',
          icon: 'success',
        });

        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        console.error(err);
        this.nonSurgeryOptionState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
