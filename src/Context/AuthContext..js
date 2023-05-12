import { auth } from "../firebase";
import { useState, createContext, useEffect} from "react"
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()

export default function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        localStorage.setItem("loggedIn", true)
        
        setCurrentUser(user)
      } else {
        localStorage.removeItem("loggedIn")
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}