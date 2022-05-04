import React, {useEffect} from 'react';
import './App.module.css';
import {Header} from "./components/Header";
import {LoginForm} from "./components/LoginPage/LoginForm";
import {Route, Routes} from "react-router-dom";
import {ToDoPage} from "./components/TasksPage/ToDoPage";
import {useDispatch} from "react-redux";
import {authMe} from "./REDUX/slices/authSlice";
import {SnackBar} from "./common/SnackBar";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [])

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<ToDoPage/>}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/tasks' element={<ToDoPage/>}/>
            </Routes>
            <SnackBar/>
        </div>
    );
}

export default App;
