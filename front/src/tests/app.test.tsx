import { render, screen } from "@testing-library/react";

import { describe, it } from "vitest";
import Main from "../pages/TodoList/Main";

describe("Main", () => {
  it("should render the component", () => {
    render(<Main />);
  });

  it("should render the heading with text 'Todo List'", () => {
    render(<Main />);
    const headingElement = screen.getByRole("heading", { name: "Todo List" });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Todo List");
  });
});
