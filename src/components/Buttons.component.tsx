'use client'

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

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
