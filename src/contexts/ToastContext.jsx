import { createContext, useContext, useState } from "react";
import MySnackbar from '../components/MySnackbar'

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    function showHideToast(message) {
        setToastMessage(message);
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    }
    return (
        <ToastContext.Provider value={{ showHideToast }}>
            <MySnackbar open={open} message={toastMessage} />
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    return useContext(ToastContext)
}
