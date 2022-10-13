import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from '../../utils/constants';
import { SubmitQuestionnaire, SubmitQuestionnaireAPIRequest } from '@conte/models';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

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
  surgeryForm: FormGroup = {} as FormGroup;
  nonSurgeryForm: FormGroup = {} as FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {}

  navBack(){
    this.surgeryQuestionnaire = false;
    this.nonSurgeryQuestionnaire = false;
    this.surveyScreen = true;
  }

  renderSurgeryForm = async () => {
    this.surgeryOptionState = 'loading';
    await delay(1500);

    this.surgeryForm = this.formBuilder.group({
      surgery_date: new FormControl('', [Validators.required]),
      primary_surgery: new FormControl('', [Validators.required]),
      secondary_surgery: new FormControl('', []),
      doctor: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      estimated_max_velocity: new FormControl('', [Validators.required]),
      demographic: new FormControl('', [Validators.required]),
    });

    this.surveyScreen = false;
    this.surgeryOptionState = 'static';
    this.surgeryQuestionnaire = true;
  };

  get f(): any {
    return this.surgeryForm.controls;
  }

  confirmSurgeryForm() {
    this.surgeryOptionState = 'loading';
    const token = JSON.parse(localStorage.getItem('token') as string);
    const surgery_date = new Date(
      this.f.surgery_date.value.year,
      this.f.surgery_date.value.month,
      this.f.surgery_date.value.day
    );

    const data: SubmitQuestionnaire[] = [
      { id: 1, response: surgery_date },
      { id: 2, response: this.f.primary_surgery.value },
      { id: 4, response: this.f.doctor.value },
      { id: 5, response: this.f.position.value },
      { id: 6, response: this.f.estimated_max_velocity.value },
      { id: 7, response: this.f.demographic.value },
    ];

    if (this.f.secondary_surgery.value) data.push({ id: 3, response: this.f.secondary_surgery.value });

    const body: SubmitQuestionnaireAPIRequest = { data };

    this.userService
      .submitQuestionnaire(token, body)
      .then((resp) => {
        localStorage.setItem('questionnaire_submitted', JSON.stringify(true));
        this.surgeryOptionState = 'static';

        this.toastService.show('Questionnaire submitted successfully.', {
          classname: 'bg-success text-light',
          icon: 'success',
        });
      })
      .catch((err) => {
        console.error(err);
        this.surgeryOptionState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }

  renderNonSurgeryForm = async () => {
    this.nonSurgeryOptionState = 'loading';
    await delay(1500);

    this.nonSurgeryForm = this.formBuilder.group({
      injury_date: new FormControl('', [Validators.required]),
      injury: new FormControl('', [Validators.required]),
      doctor: new FormControl('', [Validators.required]),
      doctor_dictation: new FormControl('', []),
      position: new FormControl('', [Validators.required]),
      estimated_max_velocity: new FormControl('', [Validators.required]),
      demographic: new FormControl('', [Validators.required]),
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
    const token = JSON.parse(localStorage.getItem('token') as string);
    const injury_date = new Date(
      this.f2.injury_date.value.year,
      this.f2.injury_date.value.month,
      this.f2.injury_date.value.day
    );

    const data: SubmitQuestionnaire[] = [
      { id: 20, response: injury_date },
      { id: 21, response: this.f2.injury.value },
      { id: 22, response: this.f2.doctor.value },
      { id: 23, response: this.f2.doctor_dictation.value },
      { id: 24, response: this.f2.position.value },
      { id: 25, response: this.f2.estimated_max_velocity.value },
      { id: 26, response: this.f2.demographic.value },
    ];

    const body: SubmitQuestionnaireAPIRequest = { data };

    this.userService
      .submitQuestionnaire(token, body)
      .then((resp) => {
        localStorage.setItem('questionnaire_submitted', JSON.stringify(true));
        this.nonSurgeryOptionState = 'static';

        this.toastService.show('Questionnaire submitted successfully.', {
          classname: 'bg-success text-light',
          icon: 'success',
        });
      })
      .catch((err) => {
        console.error(err);
        this.nonSurgeryOptionState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
