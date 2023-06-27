import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserReviews from "@/components/UserReviews";
import { LogoutButton } from "@/components/NavButtons";
import { getUserReviews } from "@/lib/serverRequests";

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const reviews:any = await getUserReviews(session?.user.id)
  const newReviews = reviews.map((review:ReviewObj) => ({
      ...review,
      _id: review._id.toString()
  }))

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center space-y-4 my-8">
      <h1 className="text-3xl lg:text-4xl">Welcome {session.user.username} 😊</h1>
      {reviews?
        <UserReviews data={newReviews} />
      : 
        <h3>No reviews found... Go write your first one!</h3>
      }
      <span>
        <LogoutButton />
      </span>
    </div>
  )
}