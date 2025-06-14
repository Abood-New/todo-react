import { createContext, useContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducer";

const TodosContext = createContext([]);
const DispatchContext = createContext(null);

export const TodosProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todosReducer, []);
    return (
        <TodosContext value={todos}>
            <DispatchContext value={dispatch}>
                {children}
            </DispatchContext>
        </TodosContext>
    )
}

export const useTodos = () => {
    return useContext(TodosContext);
}
export const useTodosDispatch = () => {
    return useContext(DispatchContext);
}

