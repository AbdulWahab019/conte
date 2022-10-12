import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'conte-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss'],
})
export class OrientationComponent implements OnInit {
  acceptTermsCheck: boolean = false;
  buttonState: string = 'static';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  acceptTerms(){
    this.buttonState = 'loading';
    this.router.navigate(['survey'])
  }
}
