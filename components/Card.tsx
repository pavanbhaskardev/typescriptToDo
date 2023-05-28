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
    <>
      <div>
        {todoList.map((e) => {
          return (
            <div
              className="mt-3 w-full py-2 px-3 border-slate-300 border-2 rounded-lg flex justify-between"
              key={e.id}
            >
              <p>{e.toDoItem}</p>
              <div className="flex gap-1">
                <div onClick={() => deleteToDoItem(e.id)}>
                  <DeleteIcon />
                </div>

                <div onClick={() => editToDoItem(e)}>
                  <EditIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
