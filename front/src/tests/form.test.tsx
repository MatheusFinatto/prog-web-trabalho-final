import { render, screen, fireEvent } from "@testing-library/react";
import Form, { handleSubmit } from "../pages/TodoList/Form";
import { vi } from "vitest";

describe("Form render", () => {
  it("should render", () => {
    render(<Form db={[]} setDb={vi.fn()} />);
  });
});

describe("Form Submission", () => {
  let originalWindowLocation: Location;

  beforeEach(() => {
    originalWindowLocation = window.location;
    window.location = {
      ...window.location,
      reload: vi.fn(),
    };
  });

  afterEach(() => {
    window.location = originalWindowLocation;
  });

  it("should redirect to https://www.youtube.com/watch?v=Sagg08DrO5U, if todo is Gandalf", () => {
    render(<Form db={[]} setDb={vi.fn()} />);

    const inputElement = screen.getByTestId("todoInput");
    const submitButton = screen.getByText("Add");

    fireEvent.change(inputElement, { target: { value: "gandalf" } });
    fireEvent.submit(submitButton);

    expect(window.location.href).toBe(
      "https://www.youtube.com/watch?v=Sagg08DrO5U"
    );
  });

  it("should NOT redirect to https://www.youtube.com/watch?v=Sagg08DrO5U, if todo is not Gandalf", () => {
    render(<Form db={[]} setDb={vi.fn()} />);

    expect(window.location.href).not.toBe(
      "https://www.youtube.com/watch?v=Sagg08DrO5U"
    );
    expect(window.location.href).toBe("http://localhost:3000/");
  });

  it("should clear the input field", () => {
    render(<Form db={[]} setDb={vi.fn()} />);
    const inputElement = screen.getByTestId("todoInput");
    expect(inputElement.innerHTML).toBe("");
  });
});
