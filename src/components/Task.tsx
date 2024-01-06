import { SubTask } from "./Subtask";

const taskItemStyles = "flex flex-col gap-1 p-4 border-2 border-red-200";
export const Task = ({
  task,
  toggleCompletedTask,
  toggleCompletedSubTask,
}: {
  task: Task;
  toggleCompletedTask: () => void;

  toggleCompletedSubTask: (subTaskIndex: number) => () => void;
}) => {
  return (
    <div className={taskItemStyles}>
      <p>{task.Description}</p>

      <div className="flex gap-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletedTask}
        />
        <h2>{task.TaskName}</h2>
      </div>
      {/* <section> */}
      {/* Render SubTasks if they exist */}
      {task.SubTasks && (
        <section className="flex flex-col gap-1 p-4 border-2 border-blue-200">
          <small>Subtasks</small>
          {task.SubTasks.map((subTask, index) => (
            <SubTask
              key={index}
              subTask={subTask}
              toggleCompleted={toggleCompletedSubTask(index)}
            />
          ))}
        </section>
      )}
      <h3>
        Points: {task.PointValue} Estimated Time: {task.EstimatedCompletionTime}{" "}
        hours
      </h3>
      {/* </section> */}
    </div>
  );
};
