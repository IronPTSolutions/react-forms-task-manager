import P1 from '../../../assets/images/icons/priority/P1.svg';
import P2 from '../../../assets/images/icons/priority/P2.svg';
import P3 from '../../../assets/images/icons/priority/P3.svg';
import P4 from '../../../assets/images/icons/priority/P4.svg';

function TaskItem({ title, priority, onDeleteTask = () => {} }) {
  let priorityImg;
  switch (priority) {
    case 1:
      priorityImg = P1;
      break;
    case 2:
      priorityImg = P2;
      break;
    case 3:
      priorityImg = P3;
      break;
    case 4:
      priorityImg = P4;
      break;
    default:
      priorityImg = P1;
  }

  return (
    <li className="list-group-item align-items-baseline d-flex">
      <div className="me-auto align-items-center d-flex gap-2">
        <img src={priorityImg} alt={priority} style={{ height: '15px' }}/>
        <span>{title}</span>
      </div>
      <div className="d-flex gap-2">
        <i className="fa fa-times text-danger" role="button" onClick={onDeleteTask}></i>
      </div>
    </li>
  )
}

export default TaskItem;
