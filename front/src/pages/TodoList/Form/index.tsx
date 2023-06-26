import { useState } from "react";
import "./styles.css";
import { dbType } from "../Main";

function createTodo(todo: dbType) {
  fetch("http://localhost:8080/v1/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
  });
}

const Form = () => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hey");
    if (todo.toLowerCase() === "gandalf") {
      window.location.href = "https://www.youtube.com/watch?v=Sagg08DrO5U";
    } else {
      const newTodo = { title: todo, completed: false };
      createTodo(newTodo);
      setTodo(""); // Reset the input field after submitting
    }
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
