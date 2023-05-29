import Chat from "../../Components/Chat";
import Sidebar from "../../Components/Sidebar";

export default function Home() {
  
  return (
    <div className="max-w-6xl m-auto flex">
      <Sidebar/>
      <Chat/>
    </div>
  )

}