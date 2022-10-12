import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'conte-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit {
  acceptTermsCheck: boolean = false;
  buttonState: string = 'static';

  constructor() {}

  ngOnInit(): void {}

  acceptTerms(){
    this.buttonState = 'loading';
  }
}
