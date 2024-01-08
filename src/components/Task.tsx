import { useState } from "react";
import { sendChatGPTRequest } from "../services/chatgpt";
import { suggestSubtaskPrompt } from "../services/chatgpt/prompts";
import { SubTask } from "./Subtask";
import { useModal } from "./Modal/Modal";

const taskItemStyles = "flex flex-col gap-1 p-4 border-2 border-red-200";
const addSubtask = (subtask: SubTask, task: Task, activityIndex: number) => {
  // update local storage
  const savedTodos = JSON.parse(`${localStorage.getItem("todos")}`);
  //   const selectedActivity: Activity = savedTodos && savedTodos[activityIndex];
  const newTodos = savedTodos.map((todo: Activity, index: number) => {
    if (index === activityIndex) {
      const newTasks = todo.Tasks.map((ltask: Task) => {
        if (ltask.TaskName === task.TaskName) {
          if (ltask.SubTasks === undefined) {
            ltask.SubTasks = [subtask];
          } else {
            ltask.SubTasks.push(subtask);
          }
        }
        return ltask;
      });
      return { ...todo, Tasks: newTasks };
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(newTodos));
};
export const Task = ({
  task,
  toggleCompletedTask,
  toggleCompletedSubTask,
}: {
  task: Task;
  toggleCompletedTask: () => void;

  toggleCompletedSubTask: (subTaskIndex: number) => () => void;
}) => {
  const selected = localStorage.getItem("selectedActivity") || 0;
  const savedTodos = JSON.parse(`${localStorage.getItem("todos")}`);
  const selectedActivity: Activity = savedTodos && savedTodos[selected];
  const [prevSuggestion, setPrevSuggestion] = useState<string[]>([]);
  const sendPrompt = async () => {
    const prompt = suggestSubtaskPrompt(task, selectedActivity, prevSuggestion);

    const res = await sendChatGPTRequest({
      value: prompt,
      id: "suggestSubtask",
      conversationId: "suggestSubtask",
    });
    setPrevSuggestion([...prevSuggestion, res.text]);
    showModal();
  };
  const [ReviewSuggestionModal, { showModal, hideModal }] = useModal({
    title: 'Review suggestion for "' + task.TaskName + '"',
    onSubmit: () => {
      addSubtask(
        JSON.parse(prevSuggestion[prevSuggestion.length - 1]),
        task,
        +selected
      );
    },
    buttons: [<button onClick={sendPrompt}>Suggest More</button>],
    children: () => (
      <>
        <pre>{prevSuggestion[prevSuggestion.length - 1]}</pre>
      </>
    ),
  });

  return (
    <div className={taskItemStyles}>
      {ReviewSuggestionModal}
      <p>{task.Description}</p>

      <div className="flex gap-1 items-center justify-between w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletedTask}
        />
        <h2 className="mr-auto">{task.TaskName}</h2>
        <button onClick={sendPrompt}>Suggest subtask</button>
      </div>
      {/* <section> */}
      {/* Render SubTasks if they exist */}
      {task.SubTasks && (
        <section className="flex flex-col gap-1 p-4 border-2 border-blue-200">
          <small>Subtasks</small>
          {task.SubTasks.map((subTask, index) => (
            <SubTask
              key={subTask.SubTaskName}
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
