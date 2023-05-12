import { Form, useActionData } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { createChat } from "../../api";
import { AuthContext } from "../../Context/AuthContext.";

export default function Search() {

  const userData = useActionData()

  const [user, setUser] = useState()

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)


  function createUser(userData) {
    const newArr = []
    userData.forEach(item => {
      newArr.push(item.data())
    })
    setUser(newArr[0])    
  }

  useEffect(() => {
    if(userData) {
      createUser(userData)
    }
  },[userData])

  async function handleSelect(user) {
    dispatch({type: "CHANGE_USER", payload: user})
    try {
      const combainedId = currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
      await createChat(combainedId, user)
      setUser(null)
    } catch(err) {
      return err
    }
  }

  return (
   <div className="bg-gray-500 p-4 flex flex-col gap-4">
      <Form method="post" className="search-form">
        <input className="w-full p-2 rounded-2xl text-xl" name="name" type="text" placeholder="find a user" />
        <button name="intent" value="search"/>
      </Form>
      {user && <div onClick={() => handleSelect(user)} className="flex items-center">
        <img className="w-14 h-14 object-cover rounded-full" src={user.photoURL} />
        <span className="text-white text-2xl ml-2" >{user.displayName}</span>
      </div>}
    </div>
  )
}