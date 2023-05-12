import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Message from "../Message";
import Input from "../Input";

export default function Messages() {

  const { data } = useContext(ChatContext)

  const [ messages, setMessages ] = useState([])

  const allMessages = messages?.map((message, index) => {
    return <Message key={index} message={message} />
  })

  useEffect(() => {
    const chatsRef = doc(db, "chats", data.chatId)

    const unSub = onSnapshot(chatsRef, doc => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => unSub()
  },[data.chatId])

  return (
    <>
      <div className="bg-indigo-300 h-[calc(100vh-160px)] p-8 overflow-scroll scrollbar-hide flex flex-col gap-6">
        {allMessages}
      </div>
      <Input messages={messages} />
    </>
  )
}