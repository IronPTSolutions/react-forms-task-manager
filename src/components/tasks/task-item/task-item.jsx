
function TaskItem({ title, onDeleteTask = () => {} }) {
  return (
    <li className="list-group-item align-items-baseline d-flex">
      <div className="me-auto">{ title }</div>
      <div className="d-flex gap-2">
        <i className="fa fa-times text-danger" role="button" onClick={onDeleteTask}></i>
      </div>
    </li>
  )
}

export default TaskItem;
