import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'conte-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  buttonState = 'static';
  userProfile = { first_name: '', last_name: '', email: '', address: '', city: '', state: '', image: '' };

  constructor(private authService: AuthenticationService, private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.authService
      .getUserDetails()
      .then((resp) => {
        this.userProfile = resp.data;
        this.spinner.hide();
      })
      .catch((err) => {});
  }
}
