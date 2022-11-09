import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'conte-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss'],
})
export class OrientationComponent implements OnInit {
  acceptTermsCheck = false;
  buttonState = 'static';

  constructor(private userService: UserService, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {}

  acceptOrientation() {
    this.buttonState = 'loading';

    this.userService
      .confirmOrientation()
      .then((resp) => {
        localStorage.setItem('orientation_watched', true.toString());
        this.buttonState = 'static';

        this.toastService.show('Orientation Confirmed.', { classname: 'bg-success text-light', icon: 'success' });
        this.router.navigate(['subscription']);
      })
      .catch((err) => {
        console.error(err);
        this.buttonState = 'static';
        this.toastService.show(err.error.message, { classname: 'bg-danger text-light', icon: 'error' });
      });
  }
}
