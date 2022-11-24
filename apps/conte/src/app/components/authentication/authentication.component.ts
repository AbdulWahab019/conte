import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../Shared/services/toast.service';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class AuthenticationComponent implements OnInit {
  email = '';
  password = '';
  confirm_password = '';
  buttonState = 'static';
  loginState = true;
  registerState = false;
  stayLoggedInCheck = true;
  termsOfUseScreen = false;
  signinForm: FormGroup = {} as FormGroup;
  registrationForm: FormGroup = {} as FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['']);
    }

    this.signinForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.registrationForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
    return form.controls['password'].value === form.controls['confirm_password'].value ? null : { mismatch: true };
  }

  switchForm() {
    if (this.loginState) {
      this.loginState = false;
      this.registerState = true;
    } else {
      this.registerState = false;
      this.loginState = true;
    }
  }

  login() {
    this.buttonState = 'loading';
    const credentials = {
      email: this.f.email.value,
      password: this.f.password.value,
    };
        localStorage.setItem('token', '1234567890');
        localStorage.setItem('user_email', 'test@test.com');

          this.router.navigate(['home']);

  }

  register() {
    this.buttonState = 'loading';
    const credentials = {
      email: this.f2.email.value,
      password: this.f2.password.value,
      confirm_password: this.f2.confirm_password.value,
    };
    console.log(credentials);
        localStorage.setItem('token', '12345');
        localStorage.setItem('user_email', 'test@test.com');
        this.buttonState = 'static';

        this.toast.show('Signed up successfully.', { classname: 'bg-success text-light', icon: 'success' });

        this.router.navigate(['home']);
    
  }
}