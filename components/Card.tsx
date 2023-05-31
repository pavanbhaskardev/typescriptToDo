"use client";
import React from "react";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import { TodoInterface } from "./todoInterface";
import { EditItem } from "@/components/editItemInterface";
import { Draggable, Droppable } from "react-beautiful-dnd";

//all props types are declared in here
interface Props {
  todoList: TodoInterface[];
  inProgressList: TodoInterface[];
  completeList: TodoInterface[];
  setToDoList: React.Dispatch<React.SetStateAction<TodoInterface[]>>;
  setInProgressList: React.Dispatch<React.SetStateAction<TodoInterface[]>>;
  setCompleteList: React.Dispatch<React.SetStateAction<TodoInterface[]>>;
  setToDo: React.Dispatch<React.SetStateAction<string | number>>;
  setEditStatus: React.Dispatch<React.SetStateAction<EditItem>>;
}

const Card: React.FC<Props> = ({
  todoList,
  inProgressList,
  completeList,
  setToDoList,
  setInProgressList,
  setCompleteList,
  setToDo,
  setEditStatus,
}) => {
  //to delete todo list item
  const deleteToDoItem = (id: number, list: string) => {
    if (list === "todoList") {
      const newListAfterDelete: TodoInterface[] = todoList.filter((e) => {
        return e.id !== id;
      });
      setToDoList(newListAfterDelete);
    } else if (list === "progressList") {
      const newListAfterDelete: TodoInterface[] = inProgressList.filter((e) => {
        return e.id !== id;
      });
      setInProgressList(newListAfterDelete);
    } else {
      const newListAfterDelete: TodoInterface[] = completeList.filter((e) => {
        return e.id !== id;
      });
      setCompleteList(newListAfterDelete);
    }
  };

  //to edit todo list item
  const editToDoItem = (item: TodoInterface, listToBeEdited: string) => {
    setToDo(item.toDoItem);
    setEditStatus({
      status: true,
      uid: item.id,
      listToBeEdited: listToBeEdited,
    });
  };

  return (
    <div className="grid gap-4 w-[128] mx-5 mt-3 mobile:grid-cols-1 lg:grid-cols-3">
      {/* dropable list of todo's */}
      <Droppable droppableId="todoList">
        {(provided) => (
          <div
            className="todoList-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="flex gap-2 mt-3 justify-center">
              <div className="h-3 w-3 bg-red-500 rounded-full mt-2"></div>
              <p className="text-lg mt-0">Todo</p>
            </div>
            {todoList.map((e, index) => {
              return (
                <Draggable
                  draggableId={e.id.toString()}
                  index={index}
                  key={e.id}
                >
                  {(provided) => (
                    <div
                      className="mt-3 md:w-1/2 mx-auto lg:w-full w-full py-2 px-3 bg-white border-slate-300 border-2 rounded-lg flex justify-between"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <p>{e.toDoItem}</p>
                      <div className="flex gap-1 cursor-pointer">
                        <div onClick={() => deleteToDoItem(e.id, "todoList")}>
                          <DeleteIcon />
                        </div>

                        <div
                          onClick={() => editToDoItem(e, "todoList")}
                          className="cursor-pointer"
                        >
                          <EditIcon />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>

      {/* in progress starts from here */}
      <Droppable droppableId="progressList">
        {(provided) => (
          <div
            className="progressList-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="flex gap-2 mt-3 justify-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-lg mt-0">In Progress</p>
            </div>
            {inProgressList.map((e, index) => {
              return (
                <Draggable
                  draggableId={e.id.toString()}
                  index={index}
                  key={e.id}
                >
                  {(provided) => (
                    <div
                      className="mt-3 md:w-1/2 mx-auto lg:w-full w-full py-2 px-3 bg-white border-slate-300 border-2 rounded-lg flex justify-between"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <p>{e.toDoItem}</p>
                      <div className="flex gap-1 cursor-pointer">
                        <div
                          onClick={() => deleteToDoItem(e.id, "progressList")}
                        >
                          <DeleteIcon />
                        </div>

                        <div
                          onClick={() => editToDoItem(e, "progressList")}
                          className="cursor-pointer"
                        >
                          <EditIcon />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="doneList">
        {(provided) => (
          <div
            className="doneList-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="flex gap-2 mt-3 justify-center">
              <div className="h-3 w-3 bg-green-500 rounded-full mt-2"></div>
              <p className="text-lg mt-0">Done</p>
            </div>
            {completeList.map((e, index) => {
              return (
                <Draggable
                  draggableId={e.id.toString()}
                  index={index}
                  key={e.id}
                >
                  {(provided) => (
                    <div
                      className="mt-3 md:w-1/2 mx-auto lg:w-full w-full py-2 px-3 bg-white border-slate-300 border-2 rounded-lg flex justify-between"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <p>{e.toDoItem}</p>
                      <div className="flex gap-1 cursor-pointer">
                        <div onClick={() => deleteToDoItem(e.id, "doneList")}>
                          <DeleteIcon />
                        </div>

                        <div
                          onClick={() => editToDoItem(e, "doneList")}
                          className="cursor-pointer"
                        >
                          <EditIcon />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Card;
