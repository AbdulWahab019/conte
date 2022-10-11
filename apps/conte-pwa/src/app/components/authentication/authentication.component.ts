import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'conte-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate(760)]),
    ]),
  ],
})
export class AuthenticationComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  buttonState: string = 'static';
  loginState: boolean = true;
  registerState: boolean = false;
  stayLoggedInCheck: boolean = true;
  termsAndConditionsCheck: boolean = false;
  signinForm: FormGroup = {} as FormGroup;
  registrationForm: FormGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.registrationForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirm_password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: this.checkPasswords }
    );
  }

  get f(): any {
    return this.signinForm.controls;
  }

  get f2(): any {
    return this.registrationForm.controls;
  }

  checkPasswords(form: FormGroup) {
    return form.controls['password'].value ===
      form.controls['confirm_password'].value
      ? null
      : { mismatch: true };
  }

  switchForm() {
    if (this.loginState) {
      this.loginState = false;
      this.registerState = true;
    } else {
      this.registerState = false;
      this.loginState = true;
    }
    console.log(this.loginState);
    console.log(this.registerState);
    console.log(this.buttonState);
  }

  login() {
    this.buttonState = 'loading';
    console.log(this.buttonState);
  }

  register() {
    this.buttonState = 'loading';
    console.log(this.buttonState);
  }
}
