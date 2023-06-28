"use client";

import Notification from "@/components/Notification";
import { SessionProvider } from "next-auth/react";
import { v4 as uuidv4 } from "uuid"

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const NotificationProvider = (props:any) => {

  const notifications = [
    {
      id: uuidv4(),
      type: "ERROR",
      message: "Must be logged in to vote."
    }
  ];

  console.log(notifications)

  return (
    <div>
      <div 
        className="fixed top-10 right-4 z-40 w-200"
      >
        {notifications.map((note) => {
          return <Notification key={note.id} {...note} />
        })}
      </div>
      {props.children}
    </div>
  )
}