import React from "react";
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import s from "../../../App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setToDo} from "../../../REDUX/slices/toDoSlice";
import {RootState} from "../../../REDUX/store";
import {CircularProgress} from "@material-ui/core";

const validate = (values: { tittle: string }) => {
    let errors: any = {}

    if (!values.tittle) {
        errors.tittle = 'Required';
    } else if (values.tittle.length > 100) {
        errors.tittle = 'Max length: 100';
    }

    return errors;
};
export const ToDoTittleForm = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<RootState, boolean>(state => state.toDoPage.toDoFetching)

    const formik = useFormik({
        initialValues: {
            tittle: '',
        },
        validate: validate,
        onSubmit: (values, {resetForm}) => {
            dispatch(setToDo(values.tittle))
            resetForm()
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={s.addTittle}>
                <TextField
                    className={s.field}
                    id="tittle"
                    name="tittle"
                    label="Tittle"
                    type="tittle"
                    size='medium'
                    value={formik.values.tittle}
                    onChange={formik.handleChange}
                    error={formik.touched.tittle && Boolean(formik.errors.tittle)}
                    helperText={formik.touched.tittle && formik.errors.tittle}
                />
                <div>
                    <Button style={{minHeight: 55}} color="primary" variant="contained" type="submit"
                            disabled={isFetching}
                    >
                        Submit
                        {isFetching && <CircularProgress size={20} color="inherit" style={{marginLeft: '10px'}}/>}
                    </Button>
                </div>
            </form>
        </div>
    )
}