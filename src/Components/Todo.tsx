"use client";

import React, { useState, useEffect } from "react";

// Define the Todo type
type Todo = {
  _id: string;
  taskDetail: string;
  completed: boolean;
};

const TodoPage = () => {
  // State to store the todo list and newTodo input
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  // Fetch Todos from the API when the component is mounted
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from the backend API (you can adjust the API endpoint)
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/get-todos`, {
        method: "GET", 
        credentials: "include", // Include credentials (cookies) with the request
      });
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const {data} = await response.json();
      setTodos(data); // Assuming the response returns an array of todos
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Handle adding a new Todo
  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return; // Don't add empty todos
    const newTodoItem: Omit<Todo, "_id"> = {
      taskDetail: newTodo,
      completed: false,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodoItem),
        credentials: "include", // Include credentials (cookies) with the request
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      fetchTodos();
      setNewTodo(""); // Clear input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Handle marking a Todo as completed
  const handleToggleCompletion = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/${id}/toggle`, {
        method: "PUT",
        credentials: "include", // Include credentials (cookies) with the request
      });

      if (!response.ok) {
        throw new Error("Failed to update todo completion");
      }

      // Fetch updated todos after toggle
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  // Handle deleting a Todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/${id}`, {
        method: "DELETE",
        credentials: "include", // Include credentials (cookies) with the request
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // Fetch updated todos after deletion
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handle Enter key to add a new Todo
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="mt-3">
      <h1 className="text-2xl text-slate-700 font-semibold mb-4">Add Your Todo</h1>

      {/* Input field for new Todo */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger add on Enter key
          placeholder="Add a new task..."
          className="border border-gray-300 rounded-l px-4 py-2 w-full focus:ring-2 focus:ring-slate-600"
        />
        <button
          onClick={handleAddTodo}
          className="bg-slate-600 text-white rounded-r px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id.toString()}
            className={`flex items-center justify-between p-2 border ${todo.completed ? "bg-lime-100" : "bg-white"} rounded`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompletion(todo._id)}
                className="mr-2"
              />
              <span className={`text-lg ${todo.completed ? "line-through" : ""}`}>
                {todo.taskDetail}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
