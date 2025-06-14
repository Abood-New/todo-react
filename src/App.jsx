import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import TodoList from './components/TodoList'
import { TodosProvider } from './contexts/TodosContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'

const initialValue = [
  {
    id: crypto.randomUUID(),
    title: "إنهاء واجب الرياضيات",
    isDone: false,
    details: "حل جميع التمارين في الفصل الخامس وتسليم الواجب عبر المنصة."
  },
  {
    id: crypto.randomUUID(),
    title: "قراءة فصل من الكتاب",
    isDone: false,
    details: "قراءة الفصل الثالث من كتاب التنمية الذاتية وتدوين الملاحظات المهمة."
  }
]
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"]
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="App">
            {/* <TodosContext.Provider value={{ todos, setTodos }}> */}
            <TodoList />
            {/* </TodosContext.Provider> */}
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider >
  )
}

export default App
