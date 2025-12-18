

const LOCAL_STORAGE_KEY = 'tasks-db';

let tasks = localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [];

const store = () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));

export const list = (sort = 'asc') => Promise.resolve(
  tasks.toSorted((t1, t2) => {
    if (sort === 'asc') return t1.priority - t2.priority;
    else return t2.priority - t1.priority;
  })
);

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    tasks = tasks.filter((task) => task.id !== id);
    store();
    resolve();
  });
}

export const create = (task) => {
  return new Promise((resolve, reject) => {
    const createdTask = {
      ...task,
      id: crypto.randomUUID().toString()
    }
    tasks.push(createdTask);
    store();
    resolve(createdTask);
  });
}
