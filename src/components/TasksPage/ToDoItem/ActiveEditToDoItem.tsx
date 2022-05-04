import React, {RefObject} from "react";
import {useDispatch} from "react-redux";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {updateToDoTittle} from "../../../REDUX/slices/toDoSlice";
import CheckIcon from "@mui/icons-material/Check";

export type ActiveEditToDoItemType = {
    activeHandler: (action: boolean) => void
    toDoId: string
    isEdit: boolean
    title: string
}
export type PropsType = {
    activeHandler: (action: boolean) => void
    ref: RefObject<HTMLDivElement> | ((instance: HTMLDivElement | null) => void) | null | undefined
    title: string
    toDoId: string
    isEdit: boolean
    titleValidate: string
    setTitleHandler: (v: string) => void
}
export type RefType = React.RefObject<HTMLSpanElement> | ((instance: HTMLSpanElement | null) => void) | null | undefined

export const ActiveEditToDoItem = React.forwardRef((props: PropsType, ref: RefType) => {
    const dispatch = useDispatch()
    return (
        <span ref={ref}>
            <TextField
                size='small'
                id="outlined-password-input"
                label="Tittle"
                type="text"
                value={props.title}
                onChange={
                    (e) => props.setTitleHandler(e.currentTarget.value)
                }
                error={Boolean(props.titleValidate)}
                helperText={props.titleValidate && props.titleValidate}
            />
            <IconButton color="primary" aria-label="upload picture"
                        disabled={Boolean(props.titleValidate)}
                        onClick={() => dispatch(updateToDoTittle({id: props.toDoId, title: props.title}))
                        } component="span">
                <CheckIcon/>
            </IconButton>
        </span>
    )
})

