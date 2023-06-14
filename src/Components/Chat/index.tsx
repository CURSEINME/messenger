import Messages from "../Messages"
import { useSelector } from "react-redux"
import { RootState } from "../../Store/store"

const Chat = () => {

  const data = useSelector((state: RootState) => state.chat)

  return (
    <div className="flex flex-col h-screen bg-gray-700 rounded-r-2xl">
      <div className="bg-gray-800 w-[calc(100vh-120px)] items-center flex h-20 rounded-r-2xl">
        <span className="text-white text-xl font-bold ml-5" >{data.user?.displayName}</span>
      </div>
      <Messages/>
    </div>
  )
}

export default Chat