import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"

export default function MobileNavBar() {
    return (
        <nav>
            <div className="inline-block">
                <Image src="/assets/mobile-nav-icon.png" alt="click to navigate" height={35} width={35} />
                <ul className="hidden absolute space-y-2">
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/browse'}>Browse</Link></li>
                    <li><Link href={'/feed'}>For You</Link></li>
                </ul>
            </div>
            <SearchBar />
            <div>
                <Link href={'/login'}>
                    <Image src="/assets/account-icon.png" alt="click to login" height={35} width={35} />
                </Link>
            </div>
        </nav>
    )
}