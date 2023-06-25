import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserReviews from "@/components/UserReviews";
import { LogoutButton } from "@/components/Buttons.component";

interface ReviewObj {
  _id: string
  email?: string
  username?: string
  rating: string
  description: string
  product_id: string
}

async function getReviews (email:string | null | undefined) {
  const res = await fetch (`http://localhost:3000/api/reviews/users/${email}`)
  if (!res.ok) {
    throw new Error('Failed to fetch reviews.');
  }
  return res.json()
}

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const reviews:ReviewObj[] = await getReviews(session?.user?.email)

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="lg:text-4xl">Welcome {session.user?.name}.</h1>
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