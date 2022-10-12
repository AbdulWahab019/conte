import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'conte-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [trigger('fade', [transition(':enter', [style({ opacity: 0 }), animate(760)])])],
})
export class AuthenticationComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  buttonState: string = 'static';
  loginState: boolean = true;
  registerState: boolean = false;
  stayLoggedInCheck: boolean = true;
  termsOfUseScreen: boolean = false;
  signinForm: FormGroup = {} as FormGroup;
  registrationForm: FormGroup = {} as FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
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
    this.authService
      .accountLogin(credentials)
      .then((resp) => {
        localStorage.setItem('token', JSON.stringify(resp.data.token));
        localStorage.setItem('terms_of_use', JSON.stringify(resp.data.is_terms_of_use_accepted));
        localStorage.setItem('orientation_watched', JSON.stringify(resp.data.is_orientation_video_watched));
        this.buttonState = 'static';

        this.toastService.show('Logged in successfully.', { classname: 'bg-success text-light', icon: 'success' });

        if (!resp.data.is_terms_of_use_accepted) {
          this.router.navigate(['terms']);
        } else if (!resp.data.is_orientation_video_watched) {
          this.router.navigate(['orientation']);
        }
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }

  register() {
    this.buttonState = 'loading';
    const credentials = {
      email: this.f2.email.value,
      password: this.f2.password.value,
      confirm_password: this.f2.confirm_password.value,
    };
    this.authService
      .accountRegister(credentials)
      .then((resp) => {
        localStorage.setItem('token', JSON.stringify(resp.data.token));
        localStorage.setItem('terms_of_use', JSON.stringify(resp.data.is_terms_of_use_accepted));
        localStorage.setItem('orientation_watched', JSON.stringify(resp.data.is_orientation_video_watched));
        this.buttonState = 'static';

        this.toastService.show('Signed up successfully.', { classname: 'bg-success text-light', icon: 'success' });

        if (!resp.data.is_terms_of_use_accepted) {
          this.router.navigate(['terms']);
        } else if (!resp.data.is_orientation_video_watched) {
          this.router.navigate(['orientation']);
        }
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
