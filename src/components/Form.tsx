import { useState } from "react";

export const FormComponent = ({
  onSubmit,
}: {
  onSubmit: (jsonData: Activity) => void;
}) => {
  const [input, setInput] = useState("");

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      const jsonData: Activity = JSON.parse(input);
      console.log("jsonData: ", jsonData);
      onSubmit(jsonData);
    } catch (error) {
      alert("Invalid JSON");
    }
  };

  return (
    <>
      <code>
        Hello ChatGPT, I need a JSON structure to help plan and gamify my
        [Objective, e.g., "study schedule", "project tasks"]. Here are the
        details I'd like to include in the JSON: - **TotalDays**: [Number of
        days for the entire task duration] - **DailyAvailableHours**: [Number of
        hours available each day for these tasks] For each task, please include
        the following details: - **TaskName**: [Name of the task] -
        **Description**: [A short description of the task] - **PointValue**:
        [Points awarded for completing the task] - **EstimatedCompletionTime**:
        [Time estimated to complete the task, in hours] -
        **EarlyCompletionBonus**: [Extra points for completing the task early] -
        **Optional**: [Specify "true" if the task is optional, otherwise
        "false"] If a task has subtasks, please include them with the same
        details. Finally, include a rewards system based on points: -
        **Rewards**: A list of rewards, each with: - **PointsRequired**: [Points
        required to unlock the reward] - **RewardDescription**: [Description of
        the reward] Based on these details, please create a JSON structure using
        provided typescript info. All rewards for me for completion can be
        bought if all points collected for all tasks.
      </code>
      <h2>Types</h2>
      <code>
        {`
              interface Activity {
                ActivityName: string;
                TotalDays: number;
                DailyAvailableHours: number;
                Tasks: Task[];
                Rewards: Rewards;
                TakenRewards: number[];
              }
              interface Rewards {
                [key: number]: string;
              }
              interface Task {
                TaskName: string;
                Description: string;
                PointValue?: number;
                EstimatedCompletionTime?: number;
                EarlyCompletionBonus: number;
                SubTasks?: SubTask[];
                Optional?: boolean;
                completed: boolean;
              }
              interface SubTask {
                SubTaskName: string;
                PointValue: number;
                EstimatedCompletionTime: number;
                completed: boolean;
              }
              `}
      </code>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleChange}
          rows={10}
          cols={50}
          placeholder="Paste your JSON here"
        ></textarea>
        <button type="submit">Load Tasks</button>
      </form>
    </>
  );
};
