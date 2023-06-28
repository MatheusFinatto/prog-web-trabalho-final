import { todoType } from "../Main";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { GiSkullCrossedBones } from "react-icons/gi";
import EditModal from "../Edit";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const TodoList = () => {
  const { loading, fetchData, data } = useFetch();
  const [item, setItem] = useState<todoType>({ title: "", completed: false });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const getLocalStorageUserId = localStorage.getItem("user") || JSON.stringify({userId: null});
  const {userId} : {userId: string | null} = (getLocalStorageUserId && JSON.parse(getLocalStorageUserId)) || null;

  useEffect(() => {
    
    userId &&  fetchData(`http://localhost:8080/v1/todos/${userId}`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTodo = async (item: todoType) => {
    await fetchData(`http://localhost:8080/v1/todos/${item.id}`, "DELETE");
    fetchData(`http://localhost:8080/v1/todos/${userId}`, "GET");
  };

  const setTaskAsCompleted = async (item: todoType) => {
    const { id, ...updatedItem } = item;
    await fetchData(`http://localhost:8080/v1/todos/${item.id}`, "PUT", {
      ...updatedItem,
      completed: !item.completed,
    });
    fetchData(`http://localhost:8080/v1/todos/${userId}`, "GET");
  };

  const openEditModal = (item: todoType) => {
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
                  onClick={() => setTaskAsCompleted(item)}
                  data-testid="check"
                >
                  <AiOutlineCheck />
                </button>

                <button onClick={() => openEditModal(item)} data-testid="edit">
                  <AiOutlineEdit />
                </button>
                <button onClick={() => deleteTodo(item)} data-testid="delete">
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
