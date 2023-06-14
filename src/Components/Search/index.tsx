import { useEffect, useState } from "react";
import { createChat, searchUser } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { SearchForm, User } from "../../types";
import { RootState } from "../../Store/store";

export default function Search() {

  const defaultState = {
    name: ""
  }

  const [user, setUser] = useState<User | null>()
  const [userData, setUserData] = useState<any>()
  const [formData, setFormData] = useState<SearchForm>(defaultState)

  const currentUser = useSelector((state: RootState) => state.auth.currentUser)

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
      const data = await searchUser({name})
      setUserData(data)
    } catch(err) {
      return null
    }
  }

  function createUser(userData) {
    const newArr: User[] = []
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

  async function handleSelect(user: User) {
    dispatch({type: "CHANGE_USER", payload: user})
    try {
      const combainedId = currentUser && currentUser.uid > user.uid
        ? currentUser?.uid + user.uid
        : user.uid + currentUser?.uid
      await createChat({combainedId, user})
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
        <LazyLoadImage effect="blur" className="w-14 h-14 object-cover rounded-full" src={user.photoURL} />
        <span className="text-white text-2xl ml-2" >{user.displayName}</span>
      </div>}
    </div>
  )
}