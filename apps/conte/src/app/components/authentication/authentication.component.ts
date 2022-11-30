import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../Shared/services/toast.service';
import { AuthenticationService } from '../../Shared/services/auth.service';
import { RegisterCreds } from '../../Shared/models/AuthCreds';
import { LoginCreds } from '../../Shared/models/AuthCreds';

@Component({
  selector: 'conte-dashboard',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
    trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])]),
  ],
})
export class AuthenticationComponent implements OnInit {
  authenticationForm: FormGroup = {} as FormGroup;
  formType = 'login';

  email = '';
  password = '';
  confirm_password = '';
  buttonState = 'static';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.formType === 'login') {
      this.authenticationForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      });
    }
  }

  get f(): any {
    return this.authenticationForm.controls;
  }

  checkPasswords(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirm_password'].value ? null : { mismatch: true };
  }

  switchForm() {
    if (this.formType === 'login') {
      this.formType = 'register';
      this.authenticationForm = this.formBuilder.group(
        {
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(8)]),
          confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        },
        { validators: this.checkPasswords }
      );
    } else {
      this.formType = 'login';
      this.authenticationForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      });
    }
  }

  login() {
    this.buttonState = 'loading';
    const credentials : LoginCreds = {
      email: this.f.email.value,
      password: this.f.password.value,
    };
    this.authService
    .userLogin(credentials)
    .then((resp) => {
      console.log(resp.data);
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('user_email', resp.data.email);
      localStorage.setItem('is_verified', resp.data.is_verified);
      localStorage.setItem('user_id', resp.data.user_id);
      this.buttonState = 'static';

      this.toast.show('Signed up successfully.', { classname: 'bg-success text-light', icon: 'success' });

      this.router.navigate(['home']);
    })
    .catch((err) => {
      console.error(err);
      this.buttonState = 'static';
      this.toast.show(err?.error?.message, { classname: 'bg-danger text-light', icon: 'error' });
    });
  }

  register() {
    this.buttonState = 'loading';
    const credentials : RegisterCreds = {
      email: this.f.email.value,
      password: this.f.password.value,
      confirm_password: this.f.confirm_password.value,
    };
    this.authService
    .userRegister(credentials)
    .then((resp) => {
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('user_email', resp.data.email);
      localStorage.setItem('is_verified', resp.data.is_verified);
      localStorage.setItem('user_id', resp.data.user_id);
      this.buttonState = 'static';

      this.toast.show('Signed up successfully.', { classname: 'bg-success text-light', icon: 'success' });

      this.router.navigate(['home']);
    })
    .catch((err:any) => {
      console.error(err);
      this.buttonState = 'static';
      this.toast.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
    });

  }
}
