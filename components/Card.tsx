"use client";
import React from "react";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import { TodoInterface } from "./todoInterface";
import { EditItem } from "@/components/editItemInterface";

//all props types are declared in here
interface Props {
  todoList: TodoInterface[];
  setToDoList: React.Dispatch<React.SetStateAction<TodoInterface[]>>;
  setToDo: React.Dispatch<React.SetStateAction<string | number>>;
  setEditStatus: React.Dispatch<React.SetStateAction<EditItem>>;
}

const Card: React.FC<Props> = ({
  todoList,
  setToDoList,
  setToDo,
  setEditStatus,
}) => {
  //to delete todo list item
  const deleteToDoItem = (id: number) => {
    const newListAfterDelete: TodoInterface[] = todoList.filter((e) => {
      return e.id !== id;
    });
    setToDoList(newListAfterDelete);
  };

  //to edit todo list item
  const editToDoItem = (item: TodoInterface) => {
    setToDo(item.toDoItem);
    setEditStatus({ status: true, uid: item.id });
  };

  return (
    <div className="grid gap-4 w-[128] mx-5 mt-3 mobile:grid-cols-1 lg:grid-cols-3">
      <div>
        <div className="flex gap-2 mt-3 justify-center">
          <div className="h-3 w-3 bg-red-500 rounded-full mt-2"></div>
          <p className="text-lg mt-0">Todo</p>
        </div>
        {todoList.map((e) => {
          return (
            <div
              className="mt-3 md:w-1/2 mx-auto lg:w-full w-full py-2 px-3 border-slate-300 border-2 rounded-lg flex justify-between"
              key={e.id}
            >
              <p>{e.toDoItem}</p>
              <div className="flex gap-1 cursor-pointer">
                <div onClick={() => deleteToDoItem(e.id)}>
                  <DeleteIcon />
                </div>

                <div onClick={() => editToDoItem(e)} className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* in progress starts from here */}
      <div className="flex gap-2 mt-3 justify-center">
        <div className="h-3 w-3 bg-blue-500 rounded-full mt-2"></div>
        <p className="text-lg mt-0">In Progress</p>
      </div>

      <div className="flex gap-2 mt-3 justify-center">
        <div className="h-3 w-3 bg-green-500 rounded-full mt-2"></div>
        <p className="text-lg mt-0">Done</p>
      </div>
    </div>
  );
};

export default Card;
