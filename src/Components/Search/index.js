import { useEffect, useState } from "react";
import { createChat, searchUser } from "../../api";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {

  const [user, setUser] = useState()
  const [userData, setUserData] = useState()
  const [formData, setFormData] = useState({
    name: ""
  })

  const currentUser = useSelector(state => state.auth.currentUser)

  const dispatch = useDispatch()

  function handleChange(event) {
    const { name, value } = event.target

    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  
  async function handleSubmit(event) {
    event.preventDefault() 

    const { name } = formData

    try {
      const data = await searchUser(name)
      setUserData(data)
    } catch(err) {
      return null
    }
  }

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
   <div className="p-4 flex flex-col gap-4">
      <form onSubmit={handleSubmit} method="post" className="search-form">
        <input className="w-full py-2 px-4 rounded-2xl text-xl bg-gray-900 text-white focus:ring-2 focus:ring-gray-900 focus:outline-none hover:bg-opacity-75"
          onChange={handleChange} 
          value={formData.name}
          name="name" 
          type="text" 
          placeholder="find a user" 
        />
      </form>
      {user && <div onClick={() => handleSelect(user)} className="flex items-center">
        <img className="w-14 h-14 object-cover rounded-full" src={user.photoURL} />
        <span className="text-white text-2xl ml-2" >{user.displayName}</span>
      </div>}
    </div>
  )
}