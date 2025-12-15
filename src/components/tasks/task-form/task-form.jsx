import { useState } from "react";
import * as TaskService from '../../../services/tasks-service';

const validations = {
  title: (value) => {
    if (!value) {
      return 'Title is required';
    } else if (value.length < 3) {
      return 'Title needs at least 3 chars';
    }
  }
}

const initialState = {
  task: {
    title: ''
  },
  errors: {
    title: validations.title('')
  },
  touched: {
    title: false
  }
}

function TaskForm({ className = '', onCreateTask = () => {} }) {
  const [state, setState] = useState(initialState);
  const { task, errors, touched } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(
      {
        ...state,
        task: {
          ...state.task,
          [name]: value
        },
        errors: {
          ...state.errors,
          [name]: validations[name](value)
        }
      }
    );
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(
      {
        ...state,
        touched: {
          ...state.touched,
          [name]: true
        }
      }
    )
  }

  const isValid = () => Object.keys(errors).every((field) => errors[field] === undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isValid()) {
        const createdTask = await TaskService.create(task);
        setState(initialState);
        onCreateTask(createdTask);
        console.log(createdTask);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={` ${className}`} onSubmit={handleSubmit}>
      <div className="input-group mb-1">
        <span className="input-group-text"><i className="fa fa-tag"></i></span>
        <input 
          type="text" 
          name="title" 
          className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
          placeholder="Task name..."
          value={task.title}
          onChange={handleChange}
          onBlur={handleBlur}
          />
        <button className="btn btn-outline-primary" type="submit" disabled={!isValid()} ><i className="fa fa-plus"></i></button>
        {errors.title && touched.title && (<div className="invalid-feedback">{errors.title}</div>)}
      </div>
    </form>
  )
}

export default TaskForm;