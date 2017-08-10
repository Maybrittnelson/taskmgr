import { TaskmgrPage } from './app.po';

describe('taskmgr App', () => {
  let page: TaskmgrPage;

  beforeEach(() => {
    page = new TaskmgrPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
