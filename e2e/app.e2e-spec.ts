import { DemeBotUIPage } from './app.po';

describe('deme-bot-ui App', function() {
  let page: DemeBotUIPage;

  beforeEach(() => {
    page = new DemeBotUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
