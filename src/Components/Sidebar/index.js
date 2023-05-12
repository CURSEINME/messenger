import Chats from "../Chats";
import Navbar from "../Navbar";
import Search from "../Search";

export default function Sidebar() {
  return (
    <div className="w-80 min-h-full bg-gray-500 rounded-bl-2xl">
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}