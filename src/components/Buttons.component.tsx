'use client'

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/navigation";

export const LoginButton = () => {
    return (
        <button 
            className="rounded hover:bg-neutral-200 outline outline-1 -outline-offset-1 py-1 px-2"
            onClick={() => signIn()}
        >
            Log In
        </button>
    )
}

export const SignupButton = () => {
    return (
        <Link href={'/signup'} className="rounded bg-slate-900 py-1 px-2 text-white">
            Sign Up
        </Link>
    )
}

export const ProfileButton = () => {
    return (
        <Link href='/profile'className="rounded bg-slate-900 py-1 px-2 text-white">
            My Profile
        </Link>
    )
}

export const LogoutButton = () => {
    return (
        <button 
            className="rounded hover:bg-neutral-200 outline outline-1 -outline-offset-1 py-1 px-2"
            onClick={() => signOut()}
        >
            Log Out
        </button>
    )
}

export const MobileLoginButton = () => {
    return (
        <Image 
            src="/assets/account-icon.png" 
            alt="click to login" 
            height={35} 
            width={35}
            onClick={() => signIn()}
            className="hover:cursor-pointer"
        />
    )
}

export const MobileProfileButton = () => {
    return (
        <Link href={'/profile'}>
            <Image 
                src="/assets/account-icon.png" 
                alt="click to account page" 
                height={35} 
                width={35} 
            />
        </Link>
    )
}

// Show the menu dropdown onclick
export const MobileMenu = () => {
    const [showMenu, setShowMenu] = useState(false)
    const router = useRouter()

    return (
        <div 
            className="inline-block space-y-2">
            <Image 
                src="/assets/mobile-nav-icon.png" 
                alt="click to navigate" 
                height={35} 
                width={35} 
                className="hover:cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
            />
            <ul 
                className={`absolute space-y-2 bg-white p-4 shadow-md rounded text-xl ${showMenu ? "" : "hidden"}`}>
                <li onClick={() => {
                    router.push('/')
                    setShowMenu(!showMenu)
                    }}
                >
                    Home
                </li>
                <li onClick={() => {
                    router.push('/browse')
                    setShowMenu(!showMenu)
                    }}
                >
                    Browse
                </li>
                <li onClick={() => {
                    router.push('/feed')
                    setShowMenu(!showMenu)
                    }}
                >
                    For You
                </li>
            </ul>
        </div>
    )
}
