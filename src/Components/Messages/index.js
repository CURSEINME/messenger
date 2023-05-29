import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Message from "../Message";
import Input from "../Input";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Messages() {

  const [ messages, setMessages ] = useState([])

  const data = useSelector(state => state.chat)

  const allMessages = messages?.map((message, index) => {
    return <Message key={index} message={message} />
  })

  useEffect(() => {
    if (data.chatId) {
      const chatsRef = doc(db, "chats", data.chatId)
      
      const unSub = onSnapshot(chatsRef, doc => {
        doc.exists() && setMessages(doc.data().messages)
      })
      return () => unSub()
    }
  },[data?.chatId])

  return (
    <>
      <ScrollToBottom className="
        bg-gray-700 h-[calc(100vh-160px)] flex flex-col gap-6 
        [&>div]:scrollbar-hide overflow-hidden 
        [&>button]:w-8 [&>button]:h-8 [&>button]:rounded-full
        ">
        {allMessages}
      </ScrollToBottom>
      <Input messages={messages} />
    </>
  )
}