import { Form } from "react-router-dom";
import { ChatContext } from "../../Context/ChatContext";
import { useContext, useEffect, useRef } from "react"

export default function Input({messages}) {

  const { data } = useContext(ChatContext)

  const formRef = useRef()

  useEffect(() => {
    if (messages[messages.length-1]?.senderId !== data.user.uid) {
      formRef.current?.reset()
    }
  },[messages])


  return (
    <div>
      <Form ref={formRef} method="post">
        <input type="text" name="message" placeholder="your message" className="bg-indigo-500 px-6 h-20 w-full text-white text-2xl rounded-br-2xl" />
        <input type="hidden" name="chatId" readOnly defaultValue={data.chatId}/>
        <input type="hidden" name="userId" readOnly defaultValue={data.user.uid}/>
        <button name="intent" value="message"/>
      </Form>
    </div>
  )
}