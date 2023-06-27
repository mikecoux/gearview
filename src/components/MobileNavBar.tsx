import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
    MobileLoginButton,
    MobileProfileButton,
    MobileMenu
} from "@/components/NavButtons"
import SearchBar from "./SearchBar"

// Only return the mobile nav bar on screens less that 1024px wide
export default async function MobileNavBar() {
    const session = await getServerSession(authOptions)

    return (
        <nav 
            className="lg:hidden z-10 flex flex-row justify-between relative m-4">
            <MobileMenu />
            <SearchBar />
            { !session ?
                <MobileLoginButton />
            : 
                <MobileProfileButton />
            }
        </nav>
    )
}