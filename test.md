Hello ChatGPT, I need a JSON structure to help plan and gamify my Grocery shopping . Here are the details I'd like to include in the JSON: - **TotalDays**: [Number of days for the entire task duration] - **DailyAvailableHours**: [Number of hours available each day for these tasks] For each task, please include the following details: - **TaskName**: [Name of the task] - **Description**: [A short description of the task] - **PointValue**: [Points awarded for completing the task] - **EstimatedCompletionTime**: [Time estimated to complete the task, in hours] - **EarlyCompletionBonus**: [Extra points for completing the task early] - **Optional**: [Specify "true" if the task is optional, otherwise "false"] If a task has subtasks, please include them with the same details. Finally, include a rewards system based on points: - **Rewards**: A list of rewards, each with: - **PointsRequired**: [Points required to unlock the reward] - **RewardDescription**: [Description of the reward] Based on these details, please create a JSON structure.

provide json for only this typescript types

interface Activity {
  TotalDays: number;
  DailyAvailableHours: number;
  Tasks: Task[];
  Rewards: Rewards;
}
interface Rewards {
  "50Points": string;
  "100Points": string;
  "150Points": string;
  "200Points": string;
}
interface Task {
  TaskName: string;
  Description: string;
  PointValue?: number;
  EstimatedCompletionTime?: number;
  EarlyCompletionBonus: number;
  SubTasks?: SubTask[];
  Optional?: boolean;
}
interface SubTask {
  SubTaskName: string;
  PointValue: number;
  EstimatedCompletionTime: number;
}