import Chats from "../Chats";
import Navbar from "../Navbar";
import Search from "../Search";

export default function Sidebar() {
  return (
    <div className="w-80 min-h-full bg-gray-900 bg-opacity-90 rounded-l-2xl">
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}