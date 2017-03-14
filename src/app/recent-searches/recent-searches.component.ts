import { Component, OnInit, Input } from '@angular/core';
import { Search } from '../models/searches.model';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styles: [`
  td {
    min-width: 200px;
  }
  .spinner-container {
    min-height: 325px;
    padding-left: 40%;
    padding-top: 10%;
  }
  @media(max-width: 600px) {
    .date {
      display: none;
    }
  }`]
})
export class RecentSearchesComponent {

  @Input() recentSearches: Array<Search>;

}
