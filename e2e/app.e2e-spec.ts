import { InterviewAngular2FrontendPage } from './app.po';

describe('interview-angular2-frontend App', () => {
  let page: InterviewAngular2FrontendPage;

  beforeEach(() => {
    page = new InterviewAngular2FrontendPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
