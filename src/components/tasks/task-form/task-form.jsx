import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import * as TaskService from '../../../services/tasks-service';


const validations = {
  title: { 
    required: 'Task title is required',
    minLength: { value: 3, message: 'Task title needs at least 3 chars' }
  }
}

const defaultValues = {
  title: '',
  priority: 1
}

const priorityOptions = [
  { value: 1, label: 'P1' },
  { value: 2, label: 'P2' },
  { value: 3, label: 'P3' },
  { value: 4, label: 'P4' },
]

function TaskForm({ className = '', onCreateTask = () => {} }) {
  const { register, handleSubmit, reset, control, watch, formState: { errors, isValid } } = useForm({ mode: 'all', defaultValues });

  const handleCreateTask = async (task) => {
    try {
      const createdTask = await TaskService.create(task);
      reset();
      onCreateTask(createdTask);
      console.log(createdTask);
    } catch (error) {
      console.error(error);
    }
  }

  console.info("priority", watch("priority"));
  return (
    <form className={` ${className}`} onSubmit={handleSubmit(handleCreateTask)}>
      <div className="input-group mb-1">

        {/* TITLE */}
        <span className="input-group-text"><i className="fa fa-tag"></i></span>
        <input 
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Task name..."
          {...register("title", validations.title)}
          />

        {/* PRIORITY */}
        <span className="input-group-text"><i className="fa fa-product-hunt"></i></span>
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <Select
              className="form-control"
              options={priorityOptions}
              value={priorityOptions.find(option => option.value === value)}
              onChange={(option) => onChange(option.value)}
              styles={{
                container: (base) => ({
                  ...base,
                  padding: 0,
                  border: 0,
                  maxWidth: '100px'
                }),
                control: (base) => ({
                  ...base,
                  borderRadius: 0
                })
              }}
            />
          )}
        />
        
        <button className="btn btn-outline-primary" type="submit" disabled={!isValid} ><i className="fa fa-plus"></i></button>
        {errors.title && (<div className="invalid-feedback">{errors.title.message}</div>)}
      </div>
    </form>
  )
}

export default TaskForm;
