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
