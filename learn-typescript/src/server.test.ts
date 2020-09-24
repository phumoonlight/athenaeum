import {someModule} from './example-module'

describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;
    someModule()
    expect(a).toBe(true);
  });
});