import { useState } from "react";
import "../App.css";
import TodoList from "../components/TodoList";
import Form from "../components/Form";

export type dbType = {
  id: number;
  title: string;
  completed: boolean;
};

function Main() {
  const [db, setDb] = useState<dbType[]>([
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Learn TypeScript", completed: false },
    { id: 3, title: "Learn Redux", completed: false },
    { id: 4, title: "Learn GraphQL", completed: true },
    { id: 5, title: "Learn Next.js", completed: true },
    { id: 6, title: "Learn Node.js", completed: false },
    { id: 7, title: "Learn MongoDB", completed: false },
  ]);

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
      <Form db={db} setDb={setDb} />
      <TodoList db={db} setDb={setDb} />
    </main>
  );
}

export default Main;
