"use client";

import Notification from "@/components/Notification";
import { SessionProvider } from "next-auth/react";
import { v4 as uuidv4 } from "uuid"
import { useReducer, createContext, useContext } from "react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const NoticationContext = createContext<any>(undefined!)

export const NotificationProvider = (props:any) => {
  const [state, dispatch] = useReducer((state:any, action:any) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, {...action.payload}]
      case "REMOVE_NOTIFICATION":
        return state.filter((el:any) => el.id !== action.id);
      default:
        return state
    }
  }, [])

  return (
    <NoticationContext.Provider value={dispatch}>
      <div 
        className="fixed top-10 right-4 z-40 w-200"
      >
        {state.map((note:any) => {
          return <Notification key={note.id} {...note} dispatch={dispatch}/>
        })}
      </div>
      {props.children}
    </NoticationContext.Provider>
  )
}

export const useNotification = () => {
  const dispatch:any = useContext(NoticationContext)

  return (props:any) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        ...props
      }
    })
  }
}