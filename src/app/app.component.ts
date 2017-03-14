import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  template: `

  <app-nav-bar>
  </app-nav-bar>

  <router-outlet></router-outlet>
  `,
  styles: [`
  `]
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() { }

}
