import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs/Observable';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-ingredients',
  template: `
    <div class="title"
    *ngIf="searchResults.length === 0 && searchPristine === false">
      <h3>No results found.</h3>
    </div>

    <div class="title"
    *ngIf="searchResults.length !== 0">
      <h3>Products</h3>
    </div>

    <div class="container">
      <div class="spinner"
      *ngIf="searchResults.length === 0 && searchPristine === true">
        <md-spinner></md-spinner>
      </div>

      <app-product class="product"
      *ngFor="let result of searchResults"
      [product]="result"></app-product>
    </div>
 `,
  styles: [`
  .container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-content: center;
    margin: 2%;
  }

  .title {
    margin-left: 7%;
    margin-top: 1%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  .spinner {
    position: absolute;
    left: 40%;
    top: 0;
    margin-top: 60px;
  }

  .product {
    flex: 0 250px;
  }
 `]
})
export class IngredientsComponent implements OnInit {

  searchResults: Array<Ingredient> = [];
  searchPristine: boolean = true;

  constructor(private ingredientsService: IngredientsService,
              private searchService: SearchService) { }

  ngOnInit(): void {

    this.ingredientsService.data
        .map(results => results.data.getTescoItems)
        .subscribe(results => this.searchResults = results);

    this.ingredientsService.queryIngredients('Chocolate');
    //TODO - Change default search term 'Chocolate' to most recent search term

    this.searchService.getSearchPristine()
                      .subscribe(pristine => {
                        this.searchPristine = pristine;
                      });
  }
}
