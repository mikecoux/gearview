'use client'

// import Link from "next/link"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import runHero from '../../public/images/run.jpg'
import hikeHero from '../../public/images/hike.jpg'
import climbHero from '../../public/images/climb.jpg'
import mobileRunHero from '../../public/images/run-mobile.jpg'
import mobileHikeHero from '../../public/images/hike-mobile.jpg'
import mobileClimbHero from '../../public/images/climb-mobile.jpg'

export default function HomepageHero(){
    const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)

    const [heroIndex, setHeroIndex] = useState<number>(0)
    const [progBar, setProgBar] = useState<number>(0)
    const [progBar2, setProgBar2] = useState<number>(0)
    const [progBar3, setProgBar3] = useState<number>(0)

    const heroImgs:any[] = [runHero, hikeHero, climbHero]
    const mobileHeroImgs:any[] = [mobileRunHero, mobileHikeHero, mobileClimbHero]
    const heroText = ["Discover trail running", "Explore new heights", "Gear that won't let you down"]

    useEffect(() => {
        const mediaWatcher = window.matchMedia("(max-width: 768px)")
        setIsMobileScreen(mediaWatcher.matches)

        function updateIsMobile(e:any) {
            setIsMobileScreen(e.matches)
        }

        mediaWatcher.addEventListener('change', updateIsMobile)

        return function cleanup() {
            mediaWatcher.removeEventListener('change', updateIsMobile)
        }

    },[])

    useEffect(() => {
        const heroInterval = setInterval(() => {
            setHeroIndex(heroIndex => (heroIndex + 1) % heroImgs.length)
        }, 4000);

        return () => clearInterval(heroInterval)
    },[])

    useEffect(() => {
        if (heroIndex === 0){
            setProgBar2(0);
            setProgBar3(0);
            const sliderInterval = setInterval(() => {
                setProgBar(progBar => (progBar + 1) % 100)
            }, 40)
            return () => clearInterval(sliderInterval)

        } else if (heroIndex === 1 ) {
            setProgBar(100);
            setProgBar3(0);
            const sliderInterval = setInterval(() => {
                setProgBar2(progBar2 => (progBar2 + 1) % 100)
            }, 40)
            return () => clearInterval(sliderInterval)

        } else {
            setProgBar(100);
            setProgBar2(100);
            const sliderInterval = setInterval(() => {
                setProgBar3(progBar3 => (progBar3 + 1) % 100)
            }, 40)
            return () => clearInterval(sliderInterval)
        }
    },[heroIndex])

    //possibly add transition-[height] and ease-linear to make the progress bar smoother

    return (
        <div className=''>
            <div className="h-[800px] overflow-hidden">
                {isMobileScreen ?
                    <Image 
                        src={mobileHeroImgs[heroIndex]} 
                        alt='homepage-hero' priority 
                        className='w-full h-auto opacity-75 absolute top-0 left-0 z-0'
                    /> 
                    :
                    <Image 
                        src={heroImgs[heroIndex]} 
                        alt='homepage-hero' priority 
                        className='w-full h-auto opacity-75 absolute top-0 left-0 z-0'
                    />
                }
            </div>
            <div className="absolute top-1/4 left-[20%] flex flex-col">
                <div className="bg-slate-100/50 w-2 h-[60px] relative rounded-lg mb-2">
                        <div className="bg-black w-full rounded-lg absolute top-0 left-0 h-[0%]" style={{ height: `${progBar}%`}}></div>
                </div>
                <div className="bg-slate-100/50 w-2 h-[60px] relative rounded-lg mb-2">
                        <div className="bg-black w-full rounded-lg absolute top-0 left-0 h-[0%]" style={{ height: `${progBar2}%`}}></div>
                </div>
                <div className="bg-slate-100/50 w-2 h-[60px] relative rounded-lg mb-2">
                        <div className="bg-black w-full rounded-lg absolute top-0 left-0 h-[0%]" style={{ height: `${progBar3}%`}}></div>
                </div>
            </div>
            <div className='flex flex-col space-y-8 absolute top-1/4 left-[22.5%]'>
                <h1 
                    className='font-bold text-xl lg:text-6xl'>
                    {heroText[heroIndex]}
                </h1>
                <Link 
                    href={'/browse'}
                    className="rounded hover:bg-neutral-200 outline outline-1 -outline-offset-1 py-1 px-2 w-fit ml-2 lg:text-2xl">
                    Start Browsing
                </Link>
            </div>
        </div>
    )
}