A shopping app built with Angular2 with a Node backend.

It demonstates the use of @ngrx/store, Rx Observables, 
Typescript, GraphQL, Stripe, Node, MongoDB.

The product data is taken from the Tesco API via graphQL.



![Alt text](angular_app.gif?raw=true "Shopping App in Angular")

# Known Issues

The D3 line chart in the dashboard does not draw in Safari or Firefox.

The Tesco API serves the product images as HTTP.

The top selling items on rare occasions renders the incorrect information.


# Ng2Rxjs

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
