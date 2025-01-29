import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { useState } from "react";

function Todos() {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleUpdateTodo = (id, text) => {
    setEditText(text);
    setEditId(id);
  };

  const submitTodo = () => {
    if (editText.trim() == "") {
      setEditId(null);
    } else {
      dispatch(
        updateTodo({
          id: editId,
          text: editText,
        })
      );
      setEditText("");
      setEditId(null);
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li className="liHolder" key={todo.id}>
            {editId == todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="inputField"
              />
            ) : (
              <span className="todoDiv">{todo.text}</span>
            )}

            {editId == todo.id ? (
              <button className="btn" onClick={submitTodo}>
                {editText.trim() !== "" ? "Save" : "Close"}
              </button>
            ) : (
              <>
                <button className="btn" onClick={() => dispatch(removeTodo(todo.id))}>
                  Delete
                </button>
                <button className="btn" onClick={() => handleUpdateTodo(todo.id, todo.text)}>
                  Update
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
