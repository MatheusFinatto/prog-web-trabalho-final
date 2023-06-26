import { useEffect, useState } from "react";
import "../Show/App.css";
import TodoList from "../Show";
import Form from "../Form";

export type dbType = {
  id?: string;
  title: string;
  completed: boolean;
};

function Main() {
  const [db, setDb] = useState<dbType[]>([]);

  function fetchTodos() {
    fetch("http://localhost:8080/v1/todos")
      .then((res) => res.json())
      .then((data) => setDb(data));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="App">
      <h1>Todo List</h1>
      <p
        style={{
          fontSize: ".8rem",
          marginTop: -30,
          marginBottom: 40,
        }}
      >
        * Please, <span style={{ color: "red" }}>do not</span> add "Gandalf" as
        a Todo.
      </p>
      <Form />
      <TodoList db={db} setDb={setDb} />
    </main>
  );
}

export default Main;
