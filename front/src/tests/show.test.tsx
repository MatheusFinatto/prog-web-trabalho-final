import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../pages/TodoList/Show";
import { vi } from "vitest";

describe("TodoList", () => {
    const mockSetDb = vi.fn();

  beforeEach(() => {
    render(<TodoList />);
  });

  it("renders the TodoList component", () => {
    const todoListElement = screen.getByRole("list");
    expect(todoListElement).toBeInTheDocument();
  });

  // it("marks a task as completed when the check button is clicked", () => {
  //   const checkButton = screen.getAllByTestId("check")[0];
  //   fireEvent.click(checkButton);
  //   expect(mockSetDb).toHaveBeenCalledWith([
  //     { id: 1, title: "Task 1", completed: true },
  //     { id: 2, title: "Task 2", completed: true },
  //   ]);
  // });

  // it("opens the edit modal when the edit button is clicked", () => {
  //   const editButton = screen.getAllByTestId("edit")[0];
  //   fireEvent.click(editButton);
  //   const modalElement = screen.getByText("Edit todo");
  //   expect(modalElement).toBeInTheDocument();
  // });

  // it("removes a task from the database when the delete button is clicked", () => {
  //   const deleteButton = screen.getAllByTestId("delete")[0];
  //   fireEvent.click(deleteButton);
  //   expect(mockSetDb).toHaveBeenCalledWith([
  //     { id: 2, title: "Task 2", completed: true },
  //   ]);
  // });
});
