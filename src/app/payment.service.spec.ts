/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { HttpModule, XHRBackend,
         Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TrackerService } from './tracker.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

class RouterStub {
  navigate(url: Array<string>) { return url; }
}

describe('PaymentService', () => {

  let service, mockbackend, trackerService, trackerServiceStub, router;

  beforeEach(() => {
    trackerServiceStub = {
      totalValueofCart () {
        Observable.of(42);
      }
    };
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PaymentService,
                  { provide: XHRBackend, useClass: MockBackend },
                  { provide: TrackerService, useValue: trackerServiceStub },
                  { provide: Router, useClass: RouterStub }]
    });
  });

  beforeEach(inject([PaymentService, XHRBackend, Router], (_paymentService, _mockbackend, _router) => {
    service = _paymentService;
    mockbackend = _mockbackend;
    router = _router;
  }));

  it('should return mocked response(sync)', () => {
    let response = ["A", "B"];

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })))
    });

    service.sendTokenToServer({id: 1}, 100).subscribe(card => {
      expect(card).toContain("A");
    })
  })
});
