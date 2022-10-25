import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { delay } from '../../utils/constants';

@Component({
  selector: 'conte-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');

    if (!token) {
      await delay(1000);
      localStorage.clear();
      this.router.navigate(['authentication']);
    } else {
      this.authService
        .verifyToken(token)
        .then((resp) => {
          localStorage.setItem('terms_of_use', resp.data.is_terms_of_use_accepted);
          localStorage.setItem('orientation_watched', resp.data.is_orientation_video_watched);
          localStorage.setItem('questionnaire_submitted', resp.data.is_questionnaire_submitted);

          if (!resp.data.is_terms_of_use_accepted) {
            this.router.navigate(['terms']);
          } else if (!resp.data.is_orientation_video_watched) {
            this.router.navigate(['orientation']);
          } else if (!resp.data.is_questionnaire_submitted) {
            this.router.navigate(['survey']);
          } else this.router.navigate(['dashboard']);
        })
        .catch((err) => {
          console.error(err);
          this.router.navigate(['authentication']);
        });
    }
  }
}
