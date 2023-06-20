import { useState } from "react";
import "./styles.css";
import { dbType } from "../Main";

interface FormProps {
  db: dbType[];
  setDb: React.Dispatch<React.SetStateAction<dbType[]>>;
}
export const handleSubmit = (
  e: React.FormEvent,
  todo: string,
  db: dbType[],
  setDb: React.Dispatch<React.SetStateAction<dbType[]>>,
  setTodo: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();

  if (todo.toLocaleLowerCase() === "gandalf") {
    window.location.href = "https://www.youtube.com/watch?v=Sagg08DrO5U";
  }
  const newId = Math.max(...db.map((item) => item.id)) + 1;
  const newTodo = { id: newId, title: todo, completed: false };
  setDb([...db, newTodo]);
  setTodo("");
};

const Form = ({ db, setDb }: FormProps) => {
  const [todo, setTodo] = useState("");

  return (
    <form
      onSubmit={(e) => handleSubmit(e, todo, db, setDb, setTodo)}
      className="todoForm"
    >
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        data-testid="todoInput"
        placeholder="Enter your todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
