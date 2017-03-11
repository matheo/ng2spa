import { Ng2spaPage } from './app.po';

describe('ng2spa App', function() {
  let page: Ng2spaPage;

  beforeEach(() => {
    page = new Ng2spaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
