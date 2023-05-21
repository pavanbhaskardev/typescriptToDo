"use client";
import React from "react";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import { TodoInterface } from "./todoInterface";

interface Props {
  todoList: TodoInterface[];
  setToDoList: React.Dispatch<React.SetStateAction<TodoInterface[]>>;
}

// const deleteToDoItem = (
//   todoList: TodoInterface[],
//   setToDoList: React.Dispatch<React.SetStateAction<TodoInterface[]>>,
//   id: number
// ) => {
//   todoList.map((e) => {
//     setToDoList([...todoList,e.id !== id]);
//   });
// };

const Card: React.FC<Props> = ({ todoList, setToDoList }) => (
  <div>
    {todoList.map((e) => {
      return (
        <div
          className="mt-3 w-full py-2 px-3 border-slate-300 border-2 rounded-lg flex justify-between"
          key={e.id}
        >
          <p>{e.toDoItem}</p>
          <div className="flex gap-1">
            {/* <div onClick={() => deleteToDoItem(todoList, setToDoList,e.id)}> */}
            <DeleteIcon />
            {/* </div> */}
            <EditIcon />
          </div>
        </div>
      );
    })}
  </div>
);

export default Card;
