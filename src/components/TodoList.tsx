import { Task } from "./Task";
const todoItemStyles = "flex flex-col gap-4 p-4 border-2 border-green-200";

const toggleCompletedTask =
  (tasks: Task[], index: number, onChange: (jsonData: Task[]) => void) =>
  () => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    onChange(newTasks);
  };

const toggleCompletedSubTask =
  (tasks: Task[], taskIndex: number, onChange: (jsonData: Task[]) => void) =>
  (subTaskIndex: number) =>
  () => {
    const newTasks = [...tasks];
    if (!newTasks[taskIndex]?.SubTasks) return newTasks;
    // @ts-ignore
    if (!newTasks[taskIndex].SubTasks[subTaskIndex]) return newTasks;
    // @ts-ignore
    newTasks[taskIndex].SubTasks[subTaskIndex].completed =
      // @ts-ignore
      !newTasks[taskIndex].SubTasks[subTaskIndex].completed;
    // return newTasks;
    onChange(newTasks);
  };
export const TodoList = ({
  tasks,
  onChange,
}: {
  tasks: Task[];

  onChange: (jsonData: Task[]) => void;
}) => {
  return (
    <div className={todoItemStyles}>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          toggleCompletedTask={toggleCompletedTask(tasks, index, onChange)}
          toggleCompletedSubTask={toggleCompletedSubTask(
            tasks,
            index,
            onChange
          )}
        />
      ))}
    </div>
  );
};
