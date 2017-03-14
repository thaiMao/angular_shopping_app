import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  template: `
  <!-- Search results here -->
  <app-ingredients></app-ingredients>
  `
})
export class HomeComponent {

  constructor() { }

}
