import Link from "next/link"
import Image from "next/image"
import SearchBar from "./SearchBar"
import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    SignupButton
} from "@/components/NavButtons"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function NavBar() {
    const session = await getServerSession(authOptions)

    return (
        <nav className="m-4 flex-row justify-between relative z-10 hidden lg:flex">
            <div className="flex lg:flex-row lg:space-x-4 items-center inline">
                <Link href={'/'} className="">
                    <Image src="/assets/gearview-logo.png" alt="gearview logo" height={35} width={150} />
                </Link>
                <Link href={'/browse'}>Browse</Link>
                <Link href={'/feed'}>For You</Link>
            </div>
            <SearchBar />
            { !session ?
                <div className="flex flex-row space-x-2 items-center">
                    <LoginButton />
                    <SignupButton />
                </div>
            :
                <div className="flex flex-row space-x-2 items-center ">
                    <LogoutButton />
                    <ProfileButton />
                </div>
            }
        </nav>
    )
}