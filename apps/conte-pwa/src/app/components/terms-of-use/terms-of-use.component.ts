import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { TECHNICAL_DIFFICULTIES } from '../../utils/constants';

@Component({
  selector: 'conte-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit {
  acceptTermsCheck = false;
  buttonState = 'static';

  constructor(private userService: UserService, private router: Router, private toast: ToastService) {}

  ngOnInit(): void {}

  acceptTerms() {
    this.buttonState = 'loading';

    this.userService
      .acceptTerms()
      .then((resp) => {
        localStorage.setItem('terms_of_use', true.toString());
        this.buttonState = 'static';

        this.toast.show('Terms of use accepted.', { classname: 'bg-success text-light', icon: 'success' });
        this.router.navigate(['orientation']);
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
      });
  }
}
