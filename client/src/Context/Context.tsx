import { createContext } from 'react';
import { Task } from '../Type/TypeToDoForm';

interface ContextType {
  addTask: (task: Task) => void;
}

const initialContextValue: ContextType = {
  addTask: () => {},
};

const stateContext = createContext<ContextType>(initialContextValue);

export default stateContext;
