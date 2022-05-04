import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../REDUX/store";
import {logOut, UserData} from "../REDUX/slices/authSlice";
import React, {useEffect} from "react";
import {Button, Typography} from "@mui/material";

export const LoginLogOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector<RootState, UserData | null>(state => state.auth.userData)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else navigate('/tasks')
    }, [user])

    if (user?.login) {
        return (
            <>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    {user.login}
                </Typography>
                <Button color={'inherit'} onClick={() => dispatch(logOut())}>Log Out</Button>
            </>
        )
    } else {
        return (
            <>
                <Button color={'inherit'} onClick={() => navigate('/login')}>Log In</Button>
            </>
        )
    }
}