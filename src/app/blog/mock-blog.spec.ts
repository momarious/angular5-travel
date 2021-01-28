import { MockBlog } from "./mock-blog";

describe('MockBlog', () => {
  it('should create an instance', () => {
    expect(new MockBlog()).toBeTruthy();
  });
});
