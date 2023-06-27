import { useState } from "react";
import "./styles.css";
import { todoType } from "../Main";
import useFetch from "../../../hooks/useFetch";

const Form = () => {
  const [todo, setTodo] = useState("");
  const { fetchData } = useFetch();

  //TODO: Make e.preventDefaeult and refetch todos without refreshing
  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();

    if (todo.toLowerCase() === "gandalf") {
      window.location.href = "https://www.youtube.com/watch?v=Sagg08DrO5U";
      return;
    }

    const newTodo = { title: todo, completed: false };
    fetchData("http://localhost:8080/v1/todos", "POST", newTodo);

    setTodo(""); // Reset the input field after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="todoForm">
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        data-testid="todoInput"
        placeholder="Enter your todo"
      />
      <button>Add</button>
    </form>
  );
};

export default Form;
