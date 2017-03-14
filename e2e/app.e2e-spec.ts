import { Ng2RxjsPage } from './app.po';

describe('ng2-rxjs App', function() {
  let page: Ng2RxjsPage;

  beforeEach(() => {
    page = new Ng2RxjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
