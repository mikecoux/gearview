import Link from "next/link"
import Image from "next/image"
import SearchBar from "./SearchBar"

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
            <div className="flex lg:flex-row lg:space-x-4 items-center">
                <Link href={'/login'} className="rounded hover:bg-neutral-200 outline outline-1 -outline-offset-1 py-1 px-2">Log In</Link>
                <Link href={'/signup'} className="rounded bg-slate-900 py-1 px-2 text-white">Sign Up</Link>
            </div>
        </nav>
    )
}