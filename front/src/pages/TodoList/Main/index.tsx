import "../Show/App.css";
import TodoList from "../Show";
import Form from "../Form";

export type todoType = {
  id?: string;
  title: string;
  completed: boolean;
};

function Main() {
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
      <TodoList />
    </main>
  );
}

export default Main;
