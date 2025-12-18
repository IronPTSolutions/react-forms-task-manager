import { useEffect, useState } from "react";
import TaskItem from "../task-item/task-item";
import * as TasksService from "../../../services/tasks-service";
import TaskForm from "../task-form/task-form";

const SORT_MODE_ASC = 'asc';
const SORT_MODE_DESC = 'desc';

function TaskList({ withForm = true }) {
  const [tasks, setTasks] = useState();
  const [reload, setReload] = useState(true);
  const [sortMode, setSortMode] = useState(SORT_MODE_ASC);

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

  const handleSortToggle = () => {
    if (sortMode === SORT_MODE_ASC) setSortMode(SORT_MODE_DESC);
    else setSortMode(SORT_MODE_ASC);
  }

  if (!tasks) {
    return null;
  } else {
    return (
      <>
        {withForm && (<TaskForm className="mb-3" onCreateTask={handleTaskCreation}/>)}

        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-outline-dark btn-sm mb-2" onClick={handleSortToggle}>
            <i className={`fa fa-sort-amount-${sortMode}`}></i>
          </button>
        </div>

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
