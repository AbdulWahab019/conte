import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from '../../../utils/constants';

@Component({
  selector: 'conte-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  buttonState = 'static';
  userEmail: string | null = '';
  clientEmail = 'info@conte.com';
  subject = '';
  emailBody = '';
  emailForm: FormGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('user_email');

    this.emailForm = this.formBuilder.group({
      to: new FormControl('', [Validators.required, Validators.email]),
      from: new FormControl('', [Validators.required, Validators.email]),
      email_body: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
    });
  }

  get f(): any {
    return this.emailForm.controls;
  }

  async sendEmail() {
    this.buttonState = 'loading';
    window.location.href = `mailto:${this.clientEmail}?subject=${this.subject}&body=${this.emailBody}%20goes%20here`;
    await delay(1500);
    this.buttonState = 'static';
  }
}
