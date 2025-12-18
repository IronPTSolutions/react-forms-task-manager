import { useEffect, useState } from "react";
import TaskItem from "../task-item/task-item";
import * as TasksService from "../../../services/tasks-service";
import TaskForm from "../task-form/task-form";

function TaskList({ withForm = true }) {
  const [tasks, setTasks] = useState();
  const [reload, setReload] = useState(true);
  const [sortMode, setSortMode] = useState('asc');

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await TasksService.list(sortMode);
      setTasks(tasks);
    }

    fetchTasks();
  }, [reload, sortMode]);

  const handleReload = () => setReload((prevReload) => !prevReload);

  const handleTaskDeletion = async (id) => {
    await TasksService.remove(id);
    handleReload();
  }

  const handleTaskCreation = () => handleReload();

  if (!tasks) {
    return null;
  } else {
    return (
      <>
        {withForm && (<TaskForm className="mb-3" onCreateTask={handleTaskCreation}/>)}

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
