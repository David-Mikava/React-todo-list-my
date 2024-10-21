import { useState } from 'react';
import stateContext from '../Context/Context';
import ToDoForm from '../ToDoForm/ToDoForm';
import { Task } from '../Type/TypeToDoForm';
import './Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  function addTask(newTask: Task) {
    setTasks([...tasks, newTask]);
  }

  function taskDelete(taskId: number) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function taskDone(taskId: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  }
  function handleEdit(taskId: number, taskName: string) {
    setEditing(true);
    setEditingTaskId(taskId);
    setEditedTaskName(taskName);
  }

  function handleSave() {
    setEditing(false);
    if (editedTaskName.trim() !== '') {
      setTasks(
        tasks.map((task) => (task.id === editingTaskId ? { ...task, name: editedTaskName } : task)),
      );
    }
    setEditingTaskId(null);
    setEditedTaskName('');
  }

  console.log(tasks);

  return (
    <stateContext.Provider value={{ addTask }}>
      <div>
        <ToDoForm />
        <ul className="Tasks">
          {tasks.map((task) => (
            <li key={task.id}>
              {editing && editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                  />
                  <button onClick={handleSave}>Save</button>
                </>
              ) : (
                <>
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={task.completed}
                      onChange={() => taskDone(task.id)}
                    />

                    <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.name}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(task.id, task.name)}>edit</button>
                    <button onClick={() => taskDelete(task.id)} type="button">
                      X
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </stateContext.Provider>
  );
}

export default Tasks;
