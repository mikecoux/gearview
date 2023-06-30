import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Login () {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/");
    }

    return (
        <LoginForm />
    )
}