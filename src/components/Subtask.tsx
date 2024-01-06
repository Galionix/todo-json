export const SubTask = ({
  subTask,
  toggleCompleted,
}: {
  subTask: SubTask;
  toggleCompleted: () => void;
}) => {
  return (
    <div>
      <span className="flex gap-1 ">
        <input
          type="checkbox"
          checked={subTask.completed}
          onChange={toggleCompleted}
        />
        <h3>{subTask.SubTaskName}</h3>
      </span>

      <p>Points: {subTask.PointValue}</p>
      <p>Estimated Time: {subTask.EstimatedCompletionTime} hours</p>
    </div>
  );
};
