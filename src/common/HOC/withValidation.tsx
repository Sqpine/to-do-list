import React, {RefObject, useEffect, useRef, useState} from "react";

type WithCharacterProps = {
    title: string
    isEdit: boolean
    activeHandler: (action: boolean) => void
    toDoId: string
}
type ChildrenProps = {
    setTitleHandler: (v: string) => void
    titleValidate: string
    ref: RefObject<HTMLSpanElement> | ((instance: HTMLSpanElement | null) => void) | null | undefined
}

export function withValidation<T extends WithCharacterProps>(
    WrappedComponent: React.ElementType<T & ChildrenProps>
) {
    return (props: T) => {
        const ref = useRef<HTMLSpanElement>(null)
        const [title, setTitle] = useState(props.title)
        const [titleValidate, setTitleValidate] = useState('')

        const setTitleHandler = (value: string) => {
            if (value === '') {
                setTitleValidate('Required')
            } else if (value.length > 100) {
                setTitleValidate('Max length: 100')
            } else setTitleValidate('')
            setTitle(value)
        }

        useEffect(() => {
            const checkIfClickedOutside = (e: MouseEvent) => {
                if (props.isEdit && ref.current && !ref.current.contains(e.target as Node)) {
                    props.activeHandler(false)
                }
            }
            console.log('add action')
            document.addEventListener("mousedown", checkIfClickedOutside)
            return () => {
                console.log('delete action')
                document.removeEventListener("mousedown", checkIfClickedOutside)
            }
        }, [props.isEdit])

        // @ts-ignore
        return (<WrappedComponent
            ref={ref}
            setTitleHandler={setTitleHandler}
            titleValidate={titleValidate}
            {...(props as T)}
            title={title}
        />)
    }
}
