import { dbType } from "../../pages/Main";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { GiSkullCrossedBones } from "react-icons/gi";

interface TodoListProps {
  db: dbType[];
  setDb: React.Dispatch<React.SetStateAction<dbType[]>>;
}

const TodoList = ({ db, setDb }: TodoListProps) => {
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

  return (
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
              <button onClick={() => setTaskAsCompleted(item)}>
                <AiOutlineCheck />
              </button>

              <button>
                <AiOutlineEdit />
              </button>
              <button
                onClick={() =>
                  setDb(db.filter((dbItem) => dbItem.id !== item.id))
                }
              >
                <GiSkullCrossedBones />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
