import { useState } from "react";
import useTask from "./hooks/useTasks";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
const Tasks = () => {
  const { tasks, loading, handleNewTask, handleDeleteTask } = useTask();
  const [newTask, setNewTask] = useState("");
  if (loading) return <span>Loading</span>;

  return (
    <>
      <button onClick={() => handleNewTask(newTask)}>new task</button>
      <input
        value={newTask}
        name="task"
        onChange={(e) => setNewTask(e.target.value)}
      ></input>
      {tasks?.map((task: Task) => (
        <div key={task.id} onClick={() => handleDeleteTask(task.id)}>
          <h3>{task.title}</h3>
        </div>
      ))}
    </>
  );
};

export default Tasks;
