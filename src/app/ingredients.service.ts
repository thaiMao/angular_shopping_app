import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

const Query = gql`
query($term: String) {
  getTescoItems(term: $term) {
    name
    price
    image
    description
  }
}`;

@Injectable()
export class IngredientsService {

  data: ApolloQueryObservable<any>;
  term$: Subject<string> = new Subject<string>();

  constructor(private apollo: Apollo) {
    this.data = apollo.watchQuery({
      query: Query,
      variables: {
        term: this.term$
      }
    })
  }

  queryIngredients(term: string): ApolloQueryObservable<any> {

    this.term$.next(term);
    return this.getSearchResults();
  }

  getSearchResults(): ApolloQueryObservable<any> {

    return this.data;
  }
}
