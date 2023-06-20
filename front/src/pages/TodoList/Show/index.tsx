import { dbType } from "../Main";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { GiSkullCrossedBones } from "react-icons/gi";
import EditModal from "../Edit";
import { useState } from "react";

interface TodoListProps {
  db: dbType[];
  setDb: React.Dispatch<React.SetStateAction<dbType[]>>;
}

const TodoList = ({ db, setDb }: TodoListProps) => {
  const [item, setItem] = useState<dbType>({
    id: 0,
    title: "",
    completed: false,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const setTaskAsCompleted = (item: dbType) => {
    setDb(
      db.map((dbItem) => {
        if (dbItem.id === item.id) {
          return { ...dbItem, completed: !dbItem.completed };
        }
        return dbItem;
      })
    );
  };

  const openEditModal = (item: dbType) => {
    setItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <ul className="todo-list">
        {db.map((item) => {
          return (
            <li key={item.id}>
              <span
                style={{ textDecoration: item.completed ? "line-through" : "" }}
              >
                {item.title}
              </span>
              <div>
                <button
                  onClick={() => setTaskAsCompleted(item)}
                  data-testid="check"
                >
                  <AiOutlineCheck />
                </button>

                <button onClick={() => openEditModal(item)} data-testid="edit">
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() =>
                    setDb(db.filter((dbItem) => dbItem.id !== item.id))
                  }
                  data-testid="delete"
                >
                  <GiSkullCrossedBones />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <EditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        item={item}
        setItem={setItem}
        db={db}
        setDb={setDb}
      />
    </>
  );
};

export default TodoList;
