
let tasks = [
  {
    id: 'qwerty1',
    title: 'Task name!'
  }
];

export const list = () => Promise.resolve([...tasks]);

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    tasks = tasks.filter((task) => task.id !== id);
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
    resolve(createdTask);
  });
}
