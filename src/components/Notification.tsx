'use client'

import { useState, useEffect } from "react"

export default function Notification (props:any) {
    const [animation, setAnimation] = useState('animate-slideLeft')
    const [width, setWidth] = useState(0)
    const [intervalId, setIntervalId] = useState<any>(null)

    const handleStartTimer = () => {
        const id = setInterval(() => {
            // check width state
            // if less than 100%, increment
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5
                }

                // close the notification
                // clear the interval when width gets to 100
                handleClose()
                clearInterval(id)
                return prev
            })
        }, 20)

        setIntervalId(id)
    }

    // pauses the interval on hover
    const handlePauseTimer = () => {
        clearInterval(intervalId)
    }

    const handleClose = () => {
        handlePauseTimer()
        setAnimation('animate-slideRight')
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    }

    useEffect(() => {
        handleStartTimer()
    }, [])

    return (
        <div 
            onMouseEnter={() => handlePauseTimer()} 
            onMouseLeave={() => handleStartTimer()}
            className={`shadow-md bg-white rounded overflow-hidden opacity-90 translate-x-[120%] ${animation}`}
        >
            <p className="p-2">
                { props.message }
            </p>
            <div className="h-2 bg-slate-900 w-[0%]" style={{ width: `${width}%`}}></div>
        </div>
    )
}