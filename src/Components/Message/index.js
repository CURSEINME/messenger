import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext.";
import { ChatContext } from "../../Context/ChatContext";

export default function Message(props) {
  
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const formRef = useRef()

  useEffect(() => {
    formRef.current?.scrollIntoView({behavior: "smooth"})
  },[props.message])

  return (
    <div ref={formRef} className={props.message.senderId == currentUser.uid
      ? "flex flex-row-reverse gap-2"
      : "flex gap-2"}>
      {props.message.senderId == data.user.uid
        ? <img className="object-cover h-12 w-12 rounded-full" src={data.user.photoURL}/> 
        : <img className="object-cover h-12 w-12 rounded-full" src={currentUser.photoURL} /> }
      <p className="text-2xl font-bold text-white px-3 pt-1 bg-violet-500 rounded-full" >{props.message.message}</p>
    </div>
  )
}