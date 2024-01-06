import { useState } from "react";

export const ActivityList = ({
  todos,
  onSelectedActivityIndexChange,
  selectedActivityIndex,
  removeActivity,
}: {
  todos: Activity[];
  selectedActivityIndex: number;
  removeActivity: (index: number) => void;
  onSelectedActivityIndexChange: (index: number) => void;
}) => {
  // const [selectedActivityIndex, setSelectedActivityIndex] = useState(initialState)<number>(
  //     -1
  // );
  const handleSelectedActivityIndexChange = (index: number) => {
    // setSelectedActivityIndex(index);
    onSelectedActivityIndexChange(index);
    //   set selectedActivity in local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedActivity", index.toString());
    }
  };
  //   console.log("todos.length: ", todos.length);
  if (!todos || todos.length === 0) {
    return <div>No Activities</div>;
  }
  return (
    <div className="flex flex-col gap-4 p-4 border-2 border-green-200">
      {todos.map((todo, index) => (
        <Activity
          removeActivity={removeActivity}
          key={index}
          todo={todo}
          index={index}
          onSelectedActivityIndexChange={handleSelectedActivityIndexChange}
          selected={selectedActivityIndex === index}
        />
      ))}
    </div>
  );
};

const Activity = ({
  todo,
  index,
  onSelectedActivityIndexChange,
  selected,
  removeActivity,
}: {
  index: number;
  todo: Activity;
  onSelectedActivityIndexChange: (index: number) => void;
  removeActivity: (index: number) => void;

  selected: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 border-2 border-green-200 ${
        selected ? "bg-green-200" : ""
      }`}
    >
      <button
        onClick={() => {
          onSelectedActivityIndexChange(index);
        }}
      >
        Select
      </button>
      <h2>{todo.ActivityName}</h2>
      <button
        className="bg-red-200 ml-auto"
        onClick={() => {
          removeActivity(index);
        }}
      >
        Remove
      </button>
    </div>
  );
};
