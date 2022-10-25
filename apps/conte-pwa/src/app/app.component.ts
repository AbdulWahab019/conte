import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from './utils/constants';

@Component({
  selector: 'conte-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'conte-pwa';
  targetElement!: Element | null;

  constructor(private router: Router){}

  ngOnInit() {
    this.targetElement = document.querySelector('html');
  }

  async refreshPage() {
    await delay(1000);
    this.router.navigate([''])
  }
}
