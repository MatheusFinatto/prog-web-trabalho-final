import { useEffect } from "react";
import "./styles.css";
import { todoType } from "../Main";
import useFetch from "../../../hooks/useFetch";

interface EditModalProps {
  item: todoType;
  setItem: React.Dispatch<React.SetStateAction<todoType>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  db: todoType[];
}

const EditModal = (props: EditModalProps) => {
  const { item, setItem, isModalOpen, setIsModalOpen, db } = props;
  const { fetchData } = useFetch();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setIsModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  function handleClose() {
    setIsModalOpen(false);
  }

  async function handleSave() {
    const { id, ...updatedItem } = item;
    setItem(updatedItem);
    console.log("🚀 ~ file: index.tsx:49 ~ handleSave ~ item:", updatedItem);
    await fetchData(
      `http://localhost:8080/v1/todos/${item.id}`,
      "PUT",
      updatedItem
    );
    alert(`${item.title} has been edited successfully!`);
    fetchData("http://localhost:8080/v1/todos", "GET", 1);
    setIsModalOpen(false);
  }

  if (!isModalOpen) return null;

  return (
    <form className={"modal"} onSubmit={handleSave}>
      <h2>Edit todo</h2>
      <div className="content">
        <input
          type="text"
          value={item.title}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
        />
      </div>
      <div className="actions">
        <button className="toggle-button" type="submit">
          Save
        </button>
        <button className="toggle-button" onClick={handleClose} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditModal;
