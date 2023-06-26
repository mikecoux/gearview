import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserReviews from "@/components/UserReviews";
import { LogoutButton } from "@/components/Buttons.component";
import { getUserReviews } from "@/lib/requests";

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const reviews:ReviewObj[] = await getUserReviews(session?.user.id)

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="lg:text-4xl">Welcome {session.user.username}.</h1>
      {reviews?
        <UserReviews data={reviews} />
      : 
        <h3>No reviews found... Go write your first one!</h3>
      }
      <span>
        <LogoutButton />
      </span>
    </div>
  )
}