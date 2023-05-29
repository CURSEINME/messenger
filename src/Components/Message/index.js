// import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Message(props) {
  
  const data = useSelector(state => state.chat)
  const currentUser = useSelector(state => state.auth.currentUser)
  
  return (
    <div className="flex flex-col p-4" >
      <div  className={props.message.senderId == currentUser.uid
        ? "flex flex-row-reverse gap-2"
        : "flex gap-2"}>
        {props.message.senderId == data.user.uid
          ? <img className="object-cover h-12 w-12 rounded-full" src={data.user.photoURL}/> 
          : <img className="object-cover h-12 w-12 rounded-full" src={currentUser.photoURL} /> }
        <p 
          className="text-2xl font-bold text-white px-3 pt-1 bg-gray-800 rounded-full">
          {props.message.message}
        </p>
      </div>
      {
        props.message.photoURL && 
        <img className={props.message.senderId == currentUser.uid 
          ? "rounded-2xl object-cover max-w-xs max-h-40 self-end mr-14 mt-5"
          : "rounded-2xl object-cover max-w-xs max-h-40 self-start ml-14 mt-5"}
        src={props.message.photoURL} />
      }
    </div>
  )
}