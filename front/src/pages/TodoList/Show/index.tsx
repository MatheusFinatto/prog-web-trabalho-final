import { dbType } from "../Main";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { GiSkullCrossedBones } from "react-icons/gi";
import EditModal from "../Edit";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const TodoList = () => {
  const { loading, fetchData, data } = useFetch();
  const [item, setItem] = useState<dbType>({ title: "", completed: false });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData("http://localhost:8080/v1/todos", "GET");
  }, []);

  const deleteTodo = (item: dbType) => {
    fetchData(`http://localhost:8080/v1/todos/${item.id}`, "DELETE");
  };

  /*  const setTaskAsCompleted = (item: dbType) => {
    setDb(
      db.map((dbItem: dbType) => {
        if (dbItem.id === item.id) {
          return { ...dbItem, completed: !dbItem.completed };
        }
        return dbItem;
      })
    );
  };
*/

  const openEditModal = (item: dbType) => {
    setItem(item);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className="todo-list">
        {data.map((item) => {
          return (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "",
                }}
              >
                {item.title}
              </span>
              <div>
                <button
                  //onClick={() => setTaskAsCompleted(item)}
                  data-testid="check"
                >
                  <AiOutlineCheck />
                </button>

                <button onClick={() => openEditModal(item)} data-testid="edit">
                  <AiOutlineEdit />
                </button>
                <button onClick={(e) => deleteTodo(item)} data-testid="delete">
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
        db={data}
      />
    </>
  );
};

export default TodoList;
