'use client'

import { useState, useEffect } from "react"

export default function Notification (props:any) {
    const [animation, setAnimation] = useState('animate-slideLeft')
    const [width, setWidth] = useState(0)
    const [intervalId, setIntervalId] = useState<any>(null)

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5
                }
                setAnimation('animate-slideRight')
                return prev
            })
        }, 20)

        setIntervalId(id)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalId)
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