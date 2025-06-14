export default function todosReducer(currentTodos, action) {
    switch (action.type) {
        case 'added': {
            const todo = {
                id: crypto.randomUUID(),
                title: action.payload.newTitle,
                details: "",
                isDone: false
            }
            const updatedTodos = [...currentTodos, todo];
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case 'deleted': {
            const updatedTodos = currentTodos.filter(t => t.id !== action.payload.id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "updated": {
            const updatedTodos = currentTodos.map(t => {
                if (t.id === action.payload.id) {
                    t.title = action.payload.title
                    t.details = action.payload.details;
                }
                return t;
            })
            localStorage.setItem('todos', JSON.stringify(updatedTodos))
            return updatedTodos;
        }
        case 'checked': {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    return { ...t, isDone: !t.isDone }
                }
                return t;
            })
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            console.log(updatedTodos);

            return updatedTodos;

        }
        case 'get': {
            return JSON.parse(localStorage.getItem('todos')) ?? [];
        }
        default:
            throw Error("Unknown Action", action.type);
    }

}