import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  submissionState = 'static';
  surveyScreen = true;
  questionnaireType = '';
  questionnaireRendered = false;
  doctors: doctor[] = [];
  surgeries: surgery[] = [];
  questionnaire: FormGroup = {} as FormGroup;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  navBack() {
    this.questionnaireType = '';
    this.surveyScreen = true;
  }

  questionnaireSelect(type: string) {
    this.questionnaireType = type;
    this.renderQuestionnaire();
  }

  renderQuestionnaire = async () => {
    if (this.questionnaireType === 'surgery') this.surgeryOptionState = 'loading';
    else this.nonSurgeryOptionState = 'loading';

    this.surveyService
      .getAllDoctors()
      .then((resp) => {
        this.doctors = resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    await delay(1800);

    if (this.questionnaireType === 'surgery') {
      this.questionnaire = this.formBuilder.group({
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
    } else
      this.questionnaire = this.formBuilder.group({
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
    this.questionnaireRendered = true;
    this.surgeryOptionState = 'static';
    this.nonSurgeryOptionState = 'static';
  };

  get f(): any {
    return this.questionnaire.controls;
  }

  getSurgeries(doctor_id: string) {
    this.spinner.show();
    this.surveyService
      .getSurgeriesForDoctor(doctor_id)
      .then((resp) => {
        this.surgeries = resp.data;
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
        console.error(err);
      });
  }

  confirmQuestionnaire() {
    this.submissionState = 'loading';

    const doctor =
      this.doctors[this.doctors.findIndex((doctor: doctor) => doctor.id.toString() === this.f.doctor.value)].name;

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

    let data: SubmitQuestionnaire[] = [];
    let body: SubmitQuestionnaireAPIRequest = {} as SubmitQuestionnaireAPIRequest;

    if (this.questionnaireType === 'surgery') {
      const primary_surgery =
        this.surgeries[
          this.surgeries.findIndex((surgery: surgery) => surgery.id.toString() === this.f.primary_surgery.value)
        ].name;
      const secondary_surgery =
        this.surgeries[
          this.surgeries.findIndex((surgery: surgery) => surgery.id.toString() === this.f.secondary_surgery.value)
        ]?.name;

      data = [
        { id: 1, response: this.f.surgery_date.value },
        { id: 2, response: primary_surgery },
        { id: 4, response: doctor },
        { id: 5, response: this.f.position.value },
      ];

      if (this.f.secondary_surgery.value) data.push({ id: 3, response: secondary_surgery });

      body = {
        data,
        doctor_id: Number(this.f.doctor.value),
        surgery_id: Number(this.f.primary_surgery.value),
        user_demographics,
      };
    } else {
      data = [
        { id: 20, response: this.f.injury_date.value },
        { id: 21, response: this.f.injury.value },
        { id: 22, response: doctor },
        { id: 23, response: this.f.doctor_dictation.value },
        { id: 24, response: this.f.position.value },
      ];

      body = {
        data,
        doctor_id: Number(this.f.doctor.value),
        user_demographics,
      };
    }

    this.surveyService
      .submitQuestionnaire(body)
      .then((resp) => {
        localStorage.setItem('questionnaire_submitted', true.toString());
        this.submissionState = 'static';

        this.toast.show('Questionnaire submitted successfully.', {
          classname: 'bg-success text-light',
          icon: 'success',
        });

        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        console.error(err);
        this.submissionState = 'static';
        this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
