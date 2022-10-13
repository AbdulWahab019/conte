import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from '../../utils/constants';

@Component({
  selector: 'conte-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    await delay(2000);
    const token = JSON.parse(localStorage.getItem('token') || JSON.stringify('expired'));
    if (token === 'expired') this.router.navigate(['authentication']);
    else {
      const is_terms_of_use_accepted = JSON.parse(localStorage.getItem('terms_of_use') as string);
      const is_orientation_confirmed = JSON.parse(localStorage.getItem('orientation_watched') as string);
      const is_questionnaire_submitted = JSON.parse(localStorage.getItem('questionnaire_submitted') as string);

      if (!is_terms_of_use_accepted) this.router.navigate(['terms']);
      else if (!is_orientation_confirmed) this.router.navigate(['orientation']);
      else this.router.navigate(['survey']);
    }
  }
}
