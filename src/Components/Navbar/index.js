import { useContext } from "react";
import { userSignOut } from "../../api";
import { AuthContext } from "../../Context/AuthContext.";

export default function Navbar() {

  const { currentUser } = useContext(AuthContext)

  async function signOut() {
    await userSignOut()
    window.location.reload()
  }

  return (
    <div className="bg-indigo-500 px-6 h-20 flex items-center justify-between rounded-tl-2xl">
      {currentUser && <div className="flex items-center">
        <img className="object-cover w-14 h-14 rounded-full" src={currentUser.photoURL} />
        <span className="text-white text-lg font-bold ml-4" >{currentUser.displayName}</span>
      </div>}
      <button onClick={signOut} className="text-sm font-bold px-3 py-2 bg-indigo-600 rounded-2xl text-white">SignOut</button>
    </div>
  )
}