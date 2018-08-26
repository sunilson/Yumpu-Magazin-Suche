import { GoogleSearchModule } from './google-search.module';

describe('GoogleSearchModule', () => {
  let googleSearchModule: GoogleSearchModule;

  beforeEach(() => {
    googleSearchModule = new GoogleSearchModule();
  });

  it('should create an instance', () => {
    expect(googleSearchModule).toBeTruthy();
  });
});
