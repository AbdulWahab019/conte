import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { delay, TECHNICAL_DIFFICULTIES } from '../../utils/constants';

@Component({
  selector: 'conte-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss'],
})
export class OrientationComponent implements OnInit {
  acceptTermsCheck = false;
  buttonState = 'static';
  videoMuted = true;
  soundButton = false;

  constructor(private userService: UserService, private router: Router, private toast: ToastService) {}

  ngOnInit(): void {}

  renderSoundButton() {
    this.soundButton = true;
  }

  checkForMute() {
    const video = <HTMLVideoElement>document.getElementById('video');
    if (video) {
      this.videoMuted = video.muted;
      if (video.muted) this.soundButton = true;
      else this.soundButton = false;
    }
  }

  acceptOrientation() {
    this.buttonState = 'loading';

    this.userService
      .confirmOrientation()
      .then((resp) => {
        localStorage.setItem('orientation_watched', true.toString());
        this.buttonState = 'static';

        this.toast.show('Orientation Confirmed.', { classname: 'bg-success text-light', icon: 'success' });
        this.router.navigate(['subscription']);
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
