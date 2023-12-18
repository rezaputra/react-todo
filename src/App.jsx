import { useEffect, useState } from "react"
import "./App.css"

function App() {
  // const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])
  const [todoEditing, setTodoEditing] = useState(null)

  useEffect(() => {
    const json = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(json)
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos)
      localStorage.setItem("todos", json)
    }
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    let todo = document.getElementById("todoAdd").value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    }
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo))
    } else {
      alert("Enter Valid Task")
    }
    document.getElementById("todoAdd").value = ""
  }

  const sumbitEdit = (newTodo) => {
    const updateTodos = [...todos].map((todo) => {
      if (todo.id === newTodo.id) {
        todo.text = document.getElementById(newTodo.id).value
      }
      return todo
    })
    setTodos(updateTodos)
    setTodoEditing(null)
  }

  const deleteTodo = (id) => {
    let updateTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updateTodos)
  }

  const toogleComplate = (id) => {
    let updateTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updateTodos)
  }

  return (
    <>
      <div id="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" id="todoAdd" />
          <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <div className="todo-text">
              {/* {todo.text} */}
              <input
                type="checkbox"
                className="checkbox"
                checked={todo.completed}
                onChange={() => toogleComplate(todo.id)}
              />
              {todo.id === todoEditing ? (
                <input type="text" id={todo.id} defaultValue={todo.text} />
              ) : (
                <div>{todo.text}</div>
              )}
            </div>
            <div className="todo-actions">
              {todo.id === todoEditing ? (
                <button onClick={() => sumbitEdit(todo)}> Submit edits</button>
              ) : (
                <button onClick={() => setTodoEditing(todo.id)}> Edit</button>
              )}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
