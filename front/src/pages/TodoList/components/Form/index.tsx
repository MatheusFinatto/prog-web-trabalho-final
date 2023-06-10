import { useState } from "react";
import { dbType } from "../../Main";
import "./styles.css";

interface FormProps {
  db: dbType[];
  setDb: React.Dispatch<React.SetStateAction<dbType[]>>;
}

const Form = ({ db, setDb }: FormProps) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo.toLocaleLowerCase() === "gandalf") {
      window.location.href = "https://www.youtube.com/watch?v=Sagg08DrO5U";
    }
    const newId = Math.max(...db.map((item) => item.id)) + 1;
    const newTodo = { id: newId, title: todo, completed: false };
    setDb([...db, newTodo]);
    setTodo("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="todoForm">
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <br />
      <br />
      <button type="submit">Add</button>
      <br />
      <br />
    </form>
  );
};

export default Form;
