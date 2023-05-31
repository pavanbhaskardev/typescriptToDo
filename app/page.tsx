"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import { TodoInterface } from "@/components/todoInterface";
import { EditItem } from "@/components/editItemInterface";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { log } from "console";

const Home: React.FC = () => {
  const [todo, setToDo] = useState<string | number>("");

  const [editStatus, setEditStatus] = useState<EditItem>({
    status: false,
    uid: "",
    listToBeEdited: "",
  });

  //consists list of todo items
  const [todoList, setToDoList] = useState<TodoInterface[]>([]);
  //consists list of inprogress items
  const [inProgressList, setInProgressList] = useState<TodoInterface[]>([]);
  //consists list of completed items
  const [completeList, setCompleteList] = useState<TodoInterface[]>([]);

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
    if (editStatus.listToBeEdited === "todoList") {
      const editedList: TodoInterface[] = todoList.map(
        (item: TodoInterface) => {
          if (item.id === editStatus.uid) {
            return { ...item, toDoItem: todo };
          }
          return item;
        }
      );
      setToDoList(editedList);
      setToDo("");
      setEditStatus({ status: false, uid: "", listToBeEdited: "" });
    } else if (editStatus.listToBeEdited === "progressList") {
      const editedList: TodoInterface[] = inProgressList.map(
        (item: TodoInterface) => {
          if (item.id === editStatus.uid) {
            return { ...item, toDoItem: todo };
          }
          return item;
        }
      );
      setInProgressList(editedList);
      setToDo("");
      setEditStatus({ status: false, uid: "", listToBeEdited: "" });
    } else {
      const editedList: TodoInterface[] = completeList.map(
        (item: TodoInterface) => {
          if (item.id === editStatus.uid) {
            return { ...item, toDoItem: todo };
          }
          return item;
        }
      );
      setCompleteList(editedList);
      setToDo("");
      setEditStatus({ status: false, uid: "", listToBeEdited: "" });
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    console.log("let's see result", result);

    let draggedItem;
    let todo = todoList;
    let progress = inProgressList;
    let completed = completeList;

    //checks source id and adds that item to draggedItem & removes from respective list of items
    if (source.droppableId === "todoList") {
      draggedItem = todoList[source.index];
      todo.splice(source.index, 1);
    } else if (source.droppableId === "progressList") {
      draggedItem = todoList[source.index];
      progress.splice(source.index, 1);
    } else {
      draggedItem = todoList[source.index];
      completed.splice(source.index, 1);
    }

    //we are adding that dragged item to a specific array
    if (destination.droppableId === "todoList") {
      todo.splice(destination.index, 0, draggedItem);
    } else if (destination.droppableId === "progressList") {
      progress.splice(destination.index, 0, draggedItem);
    } else {
      completed.splice(destination.index, 0, draggedItem);
    }

    //finally setting states
    setToDoList(todo);
    setInProgressList(progress);
    setCompleteList(completed);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div>
          <h1 className="text-4xl text-center font-bold mt-5">
            Simple To Do list
          </h1>

          {/* created form component because the todo will be add even when we click enter key */}
          <form
            className="flex gap-2 justify-center mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              editStatus.status ? editItemOnList() : addItemToList();
            }}
          >
            <input
              value={todo}
              onChange={(e) => setToDo(e.target.value)}
              placeholder="enter task"
              className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <button
              className="bg-orange-500 py-2 px-3 rounded-lg "
              type="submit"
            >
              {editStatus.status ? "Edit" : "Add"}
            </button>
          </form>
        </div>
        <Card
          todoList={todoList}
          inProgressList={inProgressList}
          completeList={completeList}
          setToDoList={setToDoList}
          setInProgressList={setInProgressList}
          setCompleteList={setCompleteList}
          setToDo={setToDo}
          setEditStatus={setEditStatus}
        />
      </DragDropContext>
    </>
  );
};

export default Home;
