import Link from "next/link"
import Image from "next/image"
import SearchBar from "./SearchBar"
import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    SignupButton
} from "@/components/Buttons.component"

export default function NavBar() {
    return (
        <nav className="m-4 flex lg:flex-row lg:justify-between lg:relative z-10">
            <div className="flex lg:flex-row lg:space-x-4 items-center">
                <Link href={'/'} className="">
                    <Image src="/assets/gearview-logo.png" alt="gearview logo" height={35} width={150} />
                </Link>
                <Link href={'/browse'}>Browse</Link>
                <Link href={'/feed'}>For You</Link>
            </div>
            <SearchBar />
            <div className="flex lg:flex-row lg:space-x-2 items-center">
                <LoginButton />
                <SignupButton />
            </div>
        </nav>
    )
}