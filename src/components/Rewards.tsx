const generalButtonClass = "border-2 border-black p-2 rounded-md";
const disabledButtonClass = "bg-gray-200";
const takenRewardClass = "bg-gray-200 text-gray-400";

const countPoints = (tasks: Task[]) => {
  let points = 0;
  tasks.forEach((task) => {
    if (task.completed && task.PointValue) {
      points += task.PointValue;
    }
    if (task.SubTasks) {
      task.SubTasks.forEach((subTask) => {
        if (subTask.completed) {
          points += subTask.PointValue;
        }
      });
    }
  });
  return points;
};
const countFreePoints = (
  tasks: Task[],
  rewards: Rewards,
  takenRewards: Activity["TakenRewards"]
) => {
  let points = countPoints(tasks);
  const Rewards = Object.entries(rewards);

  takenRewards.forEach((rewardIndex) => {
    points -= +Rewards[rewardIndex][0];
  });
  return points;
};

export const Rewards = ({
  rewards,
  tasks,
  takenRewards,
  takeReward,
}: {
  rewards: Rewards;
  tasks: Task[];
  takenRewards: Activity["TakenRewards"];
  takeReward: (reward: number) => void;
}) => {
  const freePoints = countFreePoints(tasks, rewards, takenRewards);
  const takeDisabled = (points: number) => freePoints < points;
  const isTaken = (index: number) => takenRewards.includes(index);

  return (
    <div className={`flex flex-col gap-4 p-4 border-2 border-green-200`}>
      <h2>Rewards</h2>
      {Object.entries(rewards).map(([points, reward], index) => (
        <section key={index} className="flex gap-2 items-center">
          {isTaken(index) && <p>Taken</p>}
          <button
            disabled={takeDisabled(+points)}
            className={`${generalButtonClass} ${
              takeDisabled(+points) ? disabledButtonClass : ""
            } ${isTaken(index) ? takenRewardClass : ""}`}
            onClick={() => {
              takeReward(index);
            }}
          >
            Take Reward
          </button>

          <p>
            {points}: {reward}
          </p>
        </section>
      ))}
      <h2
        className={`
       font-bold
      ${freePoints < 0 ? "text-red-500" : "text-green-500"}`}
      >
        You have: {freePoints}
      </h2>
    </div>
  );
};
