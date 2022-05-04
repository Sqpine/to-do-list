import React from "react";
import {CircularProgress} from "@mui/material";

export const Preloader = () => {

    return (
        <div style={{
            width: '100%', height: '70vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <CircularProgress size={100} color={'info'}/>
        </div>
    )
}