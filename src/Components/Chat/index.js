import { useContext } from "react"
import { ChatContext } from "../../Context/ChatContext"
import Messages from "../Messages"

export default function Chat() {

  const { data } = useContext(ChatContext)

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-indigo-500 w-[calc(100vh-120px)] items-center flex h-20 rounded-tr-2xl">
        <span className="text-white text-xl font-bold ml-5" >{data.user.displayName}</span>
      </div>
      <Messages/>
    </div>
  )
}