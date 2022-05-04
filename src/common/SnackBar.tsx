import {Alert, Snackbar} from "@mui/material";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../REDUX/store";

export const SnackBar = () => {

    const [open, setOpen] = React.useState<boolean>(false)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    const error = useSelector<RootState, string>(state => state.app.error)

    useEffect(() => {
        if (error && !open) {
            setOpen(true)
        }
    }, [error])

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}