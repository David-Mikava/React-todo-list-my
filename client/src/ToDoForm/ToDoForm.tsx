import { useContext, useState } from 'react';
import './ToDoForm.css';
import stateContext from '../Context/Context';

function ToDoForm() {
  const { addTask } = useContext(stateContext);
  const [taskName, setTaskName] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!taskName.trim()) return;
    addTask({ id: Date.now(), name: taskName, completed: false });
    setTaskName('');
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">add</button>
    </form>
  );
}

export default ToDoForm;
