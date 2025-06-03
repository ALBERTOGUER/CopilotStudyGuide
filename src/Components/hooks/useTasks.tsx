import { useEffect, useState } from "react";
import Tasks from "../Tasks";
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNewTask = (newTask: string) => {
    setTasks((prev: Task[]) => {
      return [
        ...prev,
        {
          id: Math.random(),
          title: newTask,
          description: "",
          completed: true,
        },
      ];
    });
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev: Task[]) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch("./tasks.json");
        if (!response.ok) throw new Error("error");
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  return {
    tasks,
    loading,
    handleNewTask,
    handleDeleteTask,
  };
};

export default useTask;
