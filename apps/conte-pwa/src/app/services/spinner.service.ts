import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner: boolean = false;

  constructor() {}

  setLoading(state: boolean) {
    this.spinner = state;
  }

  show() {
    this.spinner = true;
  }

  hide() {
    this.spinner = false;
  }

  getSpinnerState(): boolean {
    return this.spinner;
  }
}
