import { YumpuStuffModule } from './yumpu-stuff.module';

describe('YumpuStuffModule', () => {
  let yumpuStuffModule: YumpuStuffModule;

  beforeEach(() => {
    yumpuStuffModule = new YumpuStuffModule();
  });

  it('should create an instance', () => {
    expect(yumpuStuffModule).toBeTruthy();
  });
});
