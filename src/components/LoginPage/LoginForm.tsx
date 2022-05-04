import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import React, {useEffect} from "react";
import s from '../../App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setCaptcha, setErrorInformation} from "../../REDUX/slices/authSlice";
import {RootState} from "../../REDUX/store";

type ValuesType = {
    email: string
    password: string
    captcha: string
}
const validate = (values: ValuesType) => {
    let errors: any = {}
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    } else if (!values.password) {
        errors.password = 'Required';
    }
    return errors
}

export const LoginForm = () => {
    const dispatch = useDispatch()

    const captcha = useSelector<RootState, string>(state => state.auth.captcha)
    const helperText = useSelector<RootState, string>(state => state.auth.helperText)

    useEffect(() => {
        return () => {
            dispatch(setCaptcha({captchaurl: ''}))
            dispatch(setErrorInformation({error: ''}))
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            captcha: ''
        },
        validate: validate,
        onSubmit: (values, {setFieldValue}) => {
            dispatch(loginUser(values))
            if (captcha) {
                setFieldValue('captcha', '')
            }
        },
    });

    return (
        <div className={s.loginPage}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    className={s.field}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    placeholder='foobar@example.com'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                        (formik.touched.email && Boolean(helperText))
                        ||
                        Boolean(formik.errors.email)
                    }
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    className={s.field}
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        (formik.touched.password && Boolean(helperText))
                        ||
                        Boolean(formik.errors.password)
                    }
                    helperText={formik.touched.password && formik.errors.password}
                />
                {captcha &&
                    <>
                        <img src={captcha} alt="Captcha"/>
                        <TextField
                            className={s.field}
                            fullWidth
                            id="captcha"
                            name="captcha"
                            label="Captcha"
                            type="captcha"
                            value={formik.values.captcha}
                            onChange={formik.handleChange}
                            error={formik.touched.captcha && Boolean(formik.errors.captcha)}
                            helperText={formik.touched.captcha && formik.errors.captcha}
                        />
                    </>
                }
                {helperText && <p style={{color: 'red'}}>{helperText}</p>}
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};