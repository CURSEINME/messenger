import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux"

export default function Chats() {

  const [chats, setChats] = useState()

  const dispatch = useDispatch()
  const data = useSelector(state => state.chat)
  const currentUser = useSelector(state => state.auth.currentUser)

  const chatsEl = chats?.map(chat => {
    return (
      <div key={chat[0]}>
        {chat[1].lastMessage && <div className={data.chatId == chat[0]
            ? "bg-gray-900 rounded-3xl flex items-center gap-4 p-4" 
            : "flex items-center gap-4 p-4 hover:bg-gray-900 hover:bg-opacity-50 hover: rounded-3xl"
          }
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img className="h-14 w-14 rounded-full object-cover" src={chat[1].userInfo.photoURL} />
          <div className="flex flex-col">
            <span className="text-white text-xl font-bold" >{chat[1].userInfo.displayName}</span>
            <span className="text-white" >{chat[1].lastMessage}</span>
          </div>
        </div>}
      </div>
    )
  })

  function handleSelect(user) {
    dispatch({type:"CHANGE_USER", payload: user})
  }

  useEffect(() => {
    async function getUserChats() {
      const userChatsRef = doc(db, "userChats", currentUser.uid)
      const unSub = onSnapshot(userChatsRef, doc => {
        const data = Object.entries(doc.data())
        setChats(prev => {
          if (prev) {
            const result = data.filter(item => item[1].date !== null)
            if (result.length < prev.length) {
              return prev
            } else {
              return data.sort((a,b)=>b[1].date - a[1].date)
            }
          } else if (data.length == 0) {
            return undefined
          } else {
            return data.sort((a,b)=>b[1].date - a[1].date)
          }
        })
      })
  
      return () => {
        unSub()
      }
    }
    currentUser?.uid && getUserChats()
  },[currentUser?.uid])

  return (
    <div className="rounded-bl-2xl p-2" >
     {chatsEl}
    </div>
  )
}