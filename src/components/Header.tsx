import React from "react";
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../REDUX/store";
import LinearProgress from '@mui/material/LinearProgress';
import {LoginLogOut} from "./LoginLogOut";

export const Header = () => {
    const navigate = useNavigate()

    const taskFetching = useSelector<RootState, boolean>(state => state.tasks.fetching)
    const toDoFetching = useSelector<RootState, boolean>(state => state.toDoPage.toDoFetching)
    const toDoFetchingOther = useSelector<RootState, boolean>(state => state.toDoPage.fetching)
    const fetchingAuth = useSelector<RootState, boolean>(state => state.auth.fetching)
    const isFetching = taskFetching || toDoFetching || toDoFetchingOther || fetchingAuth

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                sx={{my: 2, color: 'white', display: 'block'}}
                                onClick={() => navigate('/tasks')}
                            >
                                My Tasks
                            </Button>
                        </Box>

                        <Box sx={{display: 'flex', gap: '30px'}}>
                            <LoginLogOut/>
                        </Box>
                    </Toolbar>
                </Container>
                {isFetching && <LinearProgress/>}
            </AppBar>
        </>
    )
}

