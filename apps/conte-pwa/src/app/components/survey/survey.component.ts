import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from '../../utils/constants';
import { SubmitQuestionnaire, SubmitQuestionnaireAPIRequest, UserDemographics } from '@conte/models';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { doctor } from '../../models/doctor';
import { surgery } from '../../models/surgery';
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
      estimated_max_velocity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      first_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      cell_phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{10,15}')]),
      birth_date: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      state: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      zip_code: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(5)]),
    });

    this.surveyScreen = false;
    this.surgeryOptionState = 'static';
    this.surgeryQuestionnaire = true;
  };

  get f(): any {
    return this.surgeryForm.controls;
  }

  getSurgeries(doctor_id: string) {
    this.spinnerService.show();
    this.surveyService
      .getSurgeriesForDoctor(doctor_id)
      .then((resp) => {
        this.surgeries = resp.data;
        this.spinnerService.hide();
      })
      .catch((err) => {
        this.spinnerService.hide();
        console.error(err);
      });
  }

  confirmSurgeryForm() {
    this.surgeryOptionState = 'loading';

    const doctor = this.doctors[this.doctors.findIndex((doctor) => doctor.id == this.f.doctor.value)].name;
    const primary_surgery =
      this.surgeries[this.surgeries.findIndex((doctor) => doctor.id == this.f.primary_surgery.value)].name;
    const secondary_surgery =
      this.surgeries[this.surgeries.findIndex((doctor) => doctor.id == this.f.secondary_surgery.value)]?.name;

    const data: SubmitQuestionnaire[] = [
      { id: 1, response: this.f.surgery_date.value },
      { id: 2, response: primary_surgery },
      { id: 4, response: doctor },
      { id: 5, response: this.f.position.value },
    ];

    if (this.f.secondary_surgery.value) data.push({ id: 3, response: secondary_surgery });

    const user_demographics: UserDemographics = {
      first_name: this.f.first_name.value,
      last_name: this.f.last_name.value,
      cell_phone: this.f.cell_phone.value,
      birth_date: this.f.birth_date.value,
      address: this.f.address.value,
      city: this.f.city.value,
      state: this.f.state.value,
      zip_code: this.f.zip_code.value,
      estimated_max_velocity: this.f.estimated_max_velocity.value,
    };

    const body: SubmitQuestionnaireAPIRequest = {
      data,
      doctor_id: Number(this.f.doctor.value),
      surgery_id: Number(this.f.primary_surgery.value),
      user_demographics,
    };

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
      doctor_dictation: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      estimated_max_velocity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      first_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      cell_phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{10,12}')]),
      birth_date: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      state: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      zip_code: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(5)]),
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

    const doctor = this.doctors[this.doctors.findIndex((doctor) => doctor.id == this.f2.doctor.value)].name;

    const data: SubmitQuestionnaire[] = [
      { id: 20, response: this.f2.injury_date.value },
      { id: 21, response: this.f2.injury.value },
      { id: 22, response: doctor },
      { id: 23, response: this.f2.doctor_dictation.value },
      { id: 24, response: this.f2.position.value },
    ];

    const user_demographics: UserDemographics = {
      first_name: this.f2.first_name.value,
      last_name: this.f2.last_name.value,
      cell_phone: this.f2.cell_phone.value,
      birth_date: this.f2.birth_date.value,
      address: this.f2.address.value,
      city: this.f2.city.value,
      state: this.f2.state.value,
      zip_code: this.f2.zip_code.value,
      estimated_max_velocity: this.f2.estimated_max_velocity.value,
    };

    const body: SubmitQuestionnaireAPIRequest = { data, doctor_id: this.f2.doctor.value, user_demographics };

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
