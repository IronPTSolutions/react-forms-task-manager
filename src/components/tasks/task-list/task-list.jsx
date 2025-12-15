import { useEffect, useState } from "react";
import TaskItem from "../task-item/task-item";
import * as TasksService from "../../../services/tasks-service";
import TaskForm from "../task-form/task-form";

function TaskList() {
  const [tasks, setTasks] = useState();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await TasksService.list();
      setTasks(tasks);
    }

    fetchTasks();
  }, [reload]);

  const handleReload = () => setReload((prevReload) => !prevReload);

  const handleTaskDeletion = async (id) => {
    await TasksService.remove(id);
    handleReload();
  }

  const handleTaskCreation = (task) => {
    setTasks([...tasks, task]);
  }

  if (!tasks) {
    return null;
  } else {
    return (
      <>
        <TaskForm className="mb-3" onCreateTask={handleTaskCreation}/>

        <ul className="list-group">
          {tasks.map((task) => (
            <TaskItem key={task.id} {...task} onDeleteTask={() => handleTaskDeletion(task.id)} />
          ))}
        </ul>
      </>
      
    )
  }
}

export default TaskList;
