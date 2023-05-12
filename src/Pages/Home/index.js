import { searchUser, sendMessage } from "../../api";
import Chat from "../../Components/Chat";
import Sidebar from "../../Components/Sidebar";

export async function action({request}) {

  const formData = await request.formData()

  const intent = formData.get("intent")

  switch (intent) {
    case "search": {
      const name = formData.get("name")
      
      try {
        const data = await searchUser(name)
        
        return data
      } catch(err) {
        return err
      }
    }
    case "message": {
      const message = formData.get("message")
      const chatId = formData.get("chatId")
      const userId = formData.get("userId")

      if (chatId && message) {
        try {
          await sendMessage(chatId, message, userId)
        } catch(err) {
          return err
        }
      } else return null
    }
  }

  return null
}

export default function Home() {
  
  return (
    <div className="max-w-6xl m-auto flex">
      <Sidebar/>
      <Chat/>
    </div>
  )

}