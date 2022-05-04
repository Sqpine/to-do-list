import React from "react";
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

type PropsType = {
    tittle: string
    activeHandler: () => void
}
export const InactiveEditToDoItem = (props: PropsType) => {
    return (
        <>
            <Typography
                variant="h4"
                noWrap
                style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minWidth: 0,
                    padding: 0,
                    margin: 0,
                    border: 0,
                    verticalAlign: 'top',
                }}
                component="div">
                {props.tittle}
            </Typography>
            <IconButton color="primary" aria-label="upload picture"
                        style={{verticalAlign: 'middle'}}
                        onClick={() => props.activeHandler()} component="span">
                <EditIcon/>
            </IconButton>
        </>
    )
}