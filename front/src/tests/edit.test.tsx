import { render, screen, fireEvent } from "@testing-library/react";

import { vi } from "vitest";
import EditModal from "../pages/TodoList/Edit";
import { todoType } from "../pages/TodoList/Main";

describe("EditModal", () => {
  const mockIsModalOpen = true;
  const mockSetIsModalOpen = vi.fn();
  const mockDb: todoType[] = [];
  const mockSetDb = vi.fn();
  const mockItem: todoType = {
    id: 1,
    title: "Sample Title",
    completed: false,
  };
  const mockSetItem = vi.fn();

  beforeEach(() => {
    render(
      <EditModal
        item={mockItem}
        setItem={mockSetItem}
        isModalOpen={mockIsModalOpen}
        setIsModalOpen={mockSetIsModalOpen}
        db={mockDb}
        setDb={mockSetDb}
      />
    );
  });

  it("should render the EditModal component", () => {
    expect(screen.getByText("Edit todo"));
  });

  it("should update the item title on input change", () => {
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New Title" } });
    expect(mockSetItem).toHaveBeenCalledWith({
      ...mockItem,
      title: "New Title",
    });
  });

  it("should call handleClose when cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });

  // it("should alter the item and close the modal on save", () => {
  //   const saveButton = screen.getByText("Save");
  //   fireEvent.click(saveButton);
  //   expect(mockSetItem).toHaveBeenCalled();
  //   expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  // });
});
