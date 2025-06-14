import Container from '@mui/material/Container';
import { Button, Card, CardContent, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Todo from './Todo';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { useTodos, useTodosDispatch } from '../contexts/TodosContext.jsx';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useToast } from '../contexts/ToastContext.jsx';

export default function TodoList() {
    // const { todos2, setTodos } = useContext(TodosContext);
    const todos = useTodos();
    const dispatch = useTodosDispatch();

    const { showHideToast } = useToast();

    const [dialogTodo, setDialogTodo] = useState("");
    const [titleInput, setTitleInput] = useState('');
    const [filter, setFilter] = useState("all");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const completedTodos = useMemo(() => {
        return todos.filter(t => {
            return t.isDone;
        })
    }, [todos]);

    const nonCompletedTodos = useMemo(() => {
        return todos.filter(t => {
            return !t.isDone;
        })
    }, [todos])

    let todosToBeRendered = todos;

    if (filter === "completed") {
        todosToBeRendered = completedTodos;
    } else if (filter === "not completed") {
        todosToBeRendered = nonCompletedTodos;
    } else {
        todosToBeRendered = todos;
    }

    useEffect(() => {
        dispatch({ type: 'get' })
    }, [])

    function handleAddClick() {
        dispatch({
            type: "added",
            payload: {
                newTitle: titleInput
            }
        });
        setTitleInput("")
        showHideToast("تمت الإضافة بنجاح")
    }

    function openDeleteDialog(todo) {
        setDialogTodo(todo);
        setShowDeleteDialog(true);
    }
    function handleDeleteConfirm() {
        dispatch({
            type: "deleted",
            payload: dialogTodo
        })
        setShowDeleteDialog(false);
        showHideToast("تم الحذف بنجاح");
    }
    function handelDeleteClose() {
        setShowDeleteDialog(false);
    }

    function OpenEditDialog(todo) {
        setDialogTodo(todo);
        setShowEditDialog(true);
    }

    function handleEditConfirm() {
        dispatch({
            type: 'updated',
            payload: dialogTodo
        })
        setShowEditDialog(false)
        showHideToast("تم التعديل بنجاح");
    }

    function handelEditClose() {
        // set({ title: dialogTodo.title, details: dialogTodo.details })
        setShowEditDialog(false);
    }

    const TodosList = todosToBeRendered.map(todo => (
        <Todo key={todo.id} todo={todo} showDelete={openDeleteDialog} showEdit={OpenEditDialog} />
    ))
    return (
        <>
            {/* Delete Dialog */}
            <Dialog
                open={showDeleteDialog}
                onClose={handelDeleteClose}
                sx={{ direction: "rtl" }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle fontWeight={400} id="alert-dialog-title">
                    {"هل انت متأكد من رغبتك في حذف هذه المهمة؟"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontWeight: 500 }} id="alert-dialog-description">
                        {`لا يمكنك التراجع عن الحذف في حال اختيار زر: (حذف)`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelDeleteClose} color="error" autoFocus>
                        إغلاق
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">نعم، قم بالحذف</Button>
                </DialogActions>
            </Dialog>
            {/* Delete Dialog */}
            {/* Edit Dialog */}
            <Dialog
                open={showEditDialog}
                onClose={handelEditClose}
                sx={{ direction: "rtl" }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle fontWeight={400} id="alert-dialog-title">
                    {"تعديل المهمة"}
                </DialogTitle>
                <DialogContent>
                    <TextField value={dialogTodo.title} margin="dense" fullWidth onChange={(e) => setDialogTodo({ ...dialogTodo, title: e.target.value })} label="العنوان" variant='standard' />
                    <TextField value={dialogTodo.details} onChange={(e) => setDialogTodo({ ...dialogTodo, details: e.target.value })} margin="dense" fullWidth label="التفاصيل" variant='standard' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelEditClose} color="primary" autoFocus>
                        إلغاء
                    </Button>
                    <Button onClick={handleEditConfirm} color="primary">تعديل</Button>
                </DialogActions>
            </Dialog>
            {/* Edit Dialog */}
            <Container maxWidth="sm">
                <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant='h2' style={{ fontWeight: 500 }}>
                            مهامي
                        </Typography>
                        <Divider />

                        {/* Filter Actions */}
                        <ToggleButtonGroup
                            sx={{ marginTop: "30px", direction: "ltr" }}
                            value={filter}
                            size='small'
                            color='error'
                            exclusive
                        >
                            <ToggleButton onClick={() => setFilter("not completed")} value="not completed">
                                غير منجز
                            </ToggleButton>
                            <ToggleButton onClick={() => setFilter("completed")} value="completed" >
                                منجز
                            </ToggleButton>
                            <ToggleButton onClick={() => setFilter("all")} value="all">
                                الكل
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {/* Filter Actions */}

                        {/* All Todos */}
                        {TodosList}
                        {/* All Todos */}

                        {/* Input + Add Button */}
                        <Grid spacing={2} container style={{ marginTop: "20px" }}>
                            <Grid size={8} >
                                <TextField value={titleInput} onChange={(e) => setTitleInput(e.target.value)} style={{ width: "100%", direction: "ltr" }} label="عنوان المهمة" variant='outlined' />
                            </Grid>
                            <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                                <Button onClick={handleAddClick} style={{ width: "100%", height: "100%" }} variant='contained'>إضافة</Button>
                            </Grid>
                        </Grid>
                        {/* Input + Add Button */}

                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
