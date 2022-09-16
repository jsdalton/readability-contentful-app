import { createFakeFieldAPI, createFakeLocalesAPI } from "@contentful/field-editor-test-utils";

const [field] = createFakeFieldAPI()

const mockSdk: any = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
  },
  ids: {
    app: 'test-app'
  },
  locales: createFakeLocalesAPI(),
  field,
  window: {
    startAutoResizer: jest.fn()
  }
};

export { mockSdk };
