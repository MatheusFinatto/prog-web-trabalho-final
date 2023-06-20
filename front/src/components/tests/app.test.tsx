// import { render } from "@testing-library/react";
// import Main from "../../pages/TodoList/Main";
// import { describe, it } from "vitest";

// describe("Main", () => {
//   it("renders", () => {
//     render(<Main />);
//   });
// });

import { describe, it, expect } from "vitest";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});
