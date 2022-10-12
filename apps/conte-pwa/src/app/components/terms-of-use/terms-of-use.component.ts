import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'conte-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit {
  acceptTermsCheck = false;
  buttonState = 'static';

  constructor(private userService: UserService, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {}

  acceptTerms() {
    this.buttonState = 'loading';
    const token = JSON.parse(localStorage.getItem('token') as string);
    this.userService
      .acceptTerms(token)
      .then((resp) => {
        localStorage.setItem('terms_of_use', JSON.stringify(true));
        this.buttonState = 'static';

        this.toastService.show('Terms of use accepted.', { classname: 'bg-success text-light', icon: 'success' });
        this.router.navigate(['orientation']);
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
