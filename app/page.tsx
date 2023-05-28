"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import { TodoInterface } from "@/components/todoInterface";
import { EditItem } from "@/components/editItemInterface";

const Home: React.FC = () => {
  const [todo, setToDo] = useState<string | number>("");

  const [editStatus, setEditStatus] = useState<EditItem>({
    status: false,
    uid: "",
  });

  const [todoList, setToDoList] = useState<TodoInterface[]>([]);

  const addItemToList = () => {
    if (todo) {
      setToDoList([
        ...todoList,
        {
          toDoItem: todo,
          status: "added",
          id: new Date().getTime(),
        },
      ]);

      setToDo("");
    }
  };

  const editItemOnList = () => {
    const editedList: TodoInterface[] = todoList.map((item: TodoInterface) => {
      if (item.id === editStatus.uid) {
        return { ...item, toDoItem: todo };
      }
      return item;
    });
    setToDoList(editedList);
    setToDo("");
    setEditStatus({ status: false, uid: "" });
  };

  return (
    <div className="w-96 mx-auto">
      <h1 className="text-4xl text-center font-bold mt-5">Simple To Do list</h1>
      <div className="flex gap-2 justify-center mt-5">
        <input
          value={todo}
          onChange={(e) => setToDo(e.target.value)}
          placeholder="enter task"
          className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        {editStatus.status ? (
          <button
            className="bg-orange-500 py-2 px-3 rounded-lg "
            onClick={editItemOnList}
          >
            Edit
          </button>
        ) : (
          <button
            className="bg-orange-500 py-2 px-3 rounded-lg "
            onClick={addItemToList}
          >
            Add
          </button>
        )}
      </div>

      <Card
        todoList={todoList}
        setToDoList={setToDoList}
        setToDo={setToDo}
        setEditStatus={setEditStatus}
      />
    </div>
  );
};

export default Home;
