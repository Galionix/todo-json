import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { FormComponent } from "../components/Form";
import { TodoList } from "../components/TodoList";
import { Rewards } from "../components/Rewards";
import { ActivityList } from "../components/ActivityList";

const inter = Inter({ subsets: ["latin"] });
const removeActivity = (todos: Activity[], index: number) => {
  const newTodos = todos.filter((todo, todoIndex) => todoIndex !== index);
  return newTodos;
};

const onClickRestart = (todos: Activity[], selectedActivityIndex: number) => {
  const newTodos = todos.map((todo, index) => {
    if (index === selectedActivityIndex) {
      const newTasks = todo.Tasks.map((task) => {
        task.completed = false;
        if (task.SubTasks) {
          task.SubTasks.forEach((subTask) => {
            subTask.completed = false;
          });
        }
        return task;
      });
      return { ...todo, Tasks: newTasks, TakenRewards: [] };
    }
    return todo;
  });
  return newTodos;
};

export default function Home() {
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number>(
    () => {
      if (typeof window !== "undefined") {
        const selected = localStorage.getItem("selectedActivity");
        if (selected !== null) {
          return +selected;
        }
      }
      return -1;
    }
  );
  const [showActivityList, setShowActivityList] = useState<boolean>(
    selectedActivityIndex === -1
  );

  const [addingActivity, setAddingActivity] = useState<boolean>(false);
  const [todos, setTodos] = useState<Activity[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : null;
    }
    return null;
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [JSON.stringify(todos)]);

  const handleJsonSubmit = (jsonData: Activity) => {
    if (todos) {
      setTodos([...todos, jsonData]);
    } else {
      setTodos([jsonData]);
    }
    setSelectedActivityIndex(todos ? todos.length : 0);
    setAddingActivity(false);
  };

  const handleChangeTasks = (tasks: Task[]) => {
    const newTodos = todos.map((todo, index) => {
      if (index === selectedActivityIndex) {
        return { ...todo, Tasks: tasks };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const takeReward = (reward: number) => {
    const newTodos = todos.map((todo, index) => {
      if (index === selectedActivityIndex) {
        const newTakenRewards = [...todo.TakenRewards];
        newTakenRewards.push(reward);
        return { ...todo, TakenRewards: newTakenRewards };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const selectedActivity = todos && todos[selectedActivityIndex];
  const [rawJson, setRawJson] = useState<string>(
    JSON.stringify(selectedActivity, null, 2)
  );
  const [showDialog, setShowDialog] = useState<boolean>(false);

  if (addingActivity) {
    return (
      <>
        <button
          className="ml-auto"
          onClick={() => {
            setAddingActivity(false);
          }}
        >
          Close
        </button>
        <FormComponent onSubmit={handleJsonSubmit} />
      </>
    );
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <header className="flex justify-between w-full">
        <button
          onClick={() => {
            setAddingActivity(true);
          }}
        >
          Start new activity
        </button>
        <button
          onClick={() => {
            setTodos(onClickRestart(todos, selectedActivityIndex));
          }}
        >
          Restart activity
        </button>
      </header>

      {showActivityList ? (
        <ActivityList
          todos={todos}
          selectedActivityIndex={selectedActivityIndex}
          onSelectedActivityIndexChange={(num) => {
            setSelectedActivityIndex(num);
            setShowActivityList(false);
          }}
          removeActivity={(index) => setTodos(removeActivity(todos, index))}
        />
      ) : (
        <>
          <button
            suppressHydrationWarning
            onClick={() => {
              setShowActivityList(true);
            }}
          >
            Show Activity List
          </button>

          {selectedActivity ? (
            <>
              <h1 className="text-2xl mt-2 mb-2">
                ActivityName: {selectedActivity.ActivityName}{" "}
              </h1>

              <div className="flex gap-4">
                <TodoList
                  onChange={handleChangeTasks}
                  tasks={selectedActivity.Tasks}
                />
                <Rewards
                  rewards={selectedActivity.Rewards}
                  tasks={selectedActivity.Tasks}
                  takenRewards={selectedActivity.TakenRewards}
                  takeReward={takeReward}
                />
                {showDialog && (
                  <dialog
                    open={false}
                    // ref={dialogRef}
                    id="rawJson"
                    className="flex flex-col gap-4 p-4 border-2 border-green-200"
                  >
                    <h1>Update Raw JSON</h1>
                    <textarea
                      rows={20}
                      cols={80}
                      onChange={(e) => {
                        setRawJson(e.target.value);
                      }}
                    >
                      {rawJson}
                    </textarea>

                    <div className="flex gap-4 justify-end">
                      <button
                        suppressHydrationWarning
                        autoFocus
                        onClick={() => {
                          setShowDialog(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          try {
                            JSON.parse(rawJson);
                          } catch (e) {
                            alert("Invalid JSON");
                            return;
                          }
                          try {
                            if (typeof window !== "undefined") {
                              const newTodos = [...todos];
                              newTodos[selectedActivityIndex] =
                                JSON.parse(rawJson);
                              setTodos(newTodos);
                            }
                          } catch (e) {
                            alert("Invalid JSON");
                            return;
                          } finally {
                            setShowDialog(false);
                          }
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </dialog>
                )}
              </div>
              <button
                className="mt-4"
                suppressHydrationWarning
                onClick={() => {
                  setShowDialog(true);
                }}
              >
                Edit Raw JSON
              </button>
            </>
          ) : (
            <h1>Select an activity</h1>
          )}
        </>
      )}
    </main>
  );
}
