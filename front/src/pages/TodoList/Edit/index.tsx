import { useEffect } from "react";
import "./styles.css";
import { dbType } from "../Main";

interface EditModalProps {
  item: dbType;
  setItem: React.Dispatch<React.SetStateAction<dbType>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  db: dbType[];
}

const EditModal = (props: EditModalProps) => {
  const { item, setItem, isModalOpen, setIsModalOpen, db } = props;

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

  function handleSave() {
    setTimeout(() => {
      setItem(item);
      const updatedDb = db.map((dbItem) => {
        if (dbItem.id === item.id) {
          return { ...dbItem, title: item.title };
        }
        return dbItem;
      });
      //setDb(updatedDb);
      alert(`${item.title} has been edited successfully!`);
      setIsModalOpen(false);
    }, 1000);
  }

  if (!isModalOpen) return null;

  return (
    <div className={"modal"}>
      <h2>Edit todo</h2>
      <div className="content">
        <input
          type="text"
          value={item.title}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
        />
      </div>
      <div className="actions">
        <button className="toggle-button" onClick={handleSave}>
          Save
        </button>
        <button className="toggle-button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
