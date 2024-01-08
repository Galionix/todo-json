export const suggestSubtaskPrompt = (
  task: Task,
  activity: Activity,
  prevSuggestion: string[]
) => {
  return `Suggest a subtask for the task "${task.TaskName}" of activity ${
    activity.ActivityName
  }.
    Here is existing data: ${JSON.stringify(task)}
    ${
      prevSuggestion.length
        ? `Dont suggest: ${prevSuggestion.join(" or ")}`
        : ""
    }
    Answer only in json form using this
    interface SubTask {
        SubTaskName: string;
        PointValue: number;
        EstimatedCompletionTime: number;
        completed: boolean;
      }
      respond only with json
      respond only with json
      respond only with json
      respond only with json
    `;
};

export const suggestActivityPlanPrompt = (activity: string) => {
  return `Hello ChatGPT, I need a JSON structure to help plan and gamify my ${activity}. Here are the details I'd like to include in the JSON: - **TotalDays**: [Number of days for the entire task duration] - **DailyAvailableHours**: [Number of hours available each day for these tasks] For each task, please include the following details: - **TaskName**: [Name of the task] - **Description**: [A short description of the task] - **PointValue**: [Points awarded for completing the task] - **EstimatedCompletionTime**: [Time estimated to complete the task, in hours] - **EarlyCompletionBonus**: [Extra points for completing the task early] - **Optional**: [Specify "true" if the task is optional, otherwise "false"] If a task has subtasks, please include them with the same details. Finally, include a rewards system based on points: - **Rewards**: A list of rewards, each with: - **PointsRequired**: [Points required to unlock the reward] - **RewardDescription**: [Description of the reward] Based on these details, please create a JSON structure using provided typescript info. All rewards for me for completion can be bought if all points collected for all tasks, so you need to calculate proper values for them
  Be descriptive and provide actual plan not some stupid dummy example texts for tasks and subtasks. I need real plan for my activity.
    Types
    interface Activity { ActivityName: string; TotalDays: number; DailyAvailableHours: number; Tasks: Task[]; Rewards: Rewards; TakenRewards: number[]; } interface Rewards { [key: number]: string; } interface Task { TaskName: string; Description: string; PointValue?: number; EstimatedCompletionTime?: number; EarlyCompletionBonus: number; SubTasks?: SubTask[]; Optional?: boolean; completed: boolean; } interface SubTask { SubTaskName: string; PointValue: number; EstimatedCompletionTime: number; completed: boolean; }
    respond only with json
    respond only with json
    respond only with json
    respond only with json

`;
};
