import { DeleteOutlineOutlined } from "@mui/icons-material"
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { useToast } from "../contexts/ToastContext.jsx";
import { useTodosDispatch } from "../contexts/TodosContext.jsx";
export default function Todo({ todo, showDelete, showEdit }) {
    // const { setTodos } = useContext(TodosContext);

    const dispatch = useTodosDispatch();

    const { showHideToast } = useToast();

    const customButtonStyling = {
        background: todo.isDone ? "green" : "white",
        color: todo.isDone ? "white" : "#8bc34a",
        border: `solid ${todo.isDone ? "green" : "#8bc34a"}  3px`
    };

    function handleCheckClick() {
        dispatch({
            type: "checked",
            payload: todo
        })
        showHideToast("تم التعديل بنجاح");
    }

    function handleDeleteClick(todo) {
        showDelete(todo);
    }
    function handleEditClick(todo) {
        showEdit(todo);
    }

    return (
        <>
            <Card className="card" sx={{ minWidth: 275, background: "#252f88", color: "white", marginTop: "10px" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography variant="h5" sx={{ textAlign: "right" }}>
                                {todo.title}
                            </Typography>
                            <Typography variant="h6" sx={{ textAlign: "right", fontWeight: 100 }}>
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid size={4} display="flex" alignItems="center" justifyContent="space-around">
                            <IconButton onClick={handleCheckClick} className="icon-button" style={customButtonStyling}>
                                <CheckOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEditClick(todo)} className="icon-button" style={{ color: "#1769aa", background: "white", border: "solid #1769aa 3px" }}>
                                <ModeEditOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(todo)} className="icon-button" style={{ color: "#b23c17", background: "white", border: "solid #b23c17 3px" }}>
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}
