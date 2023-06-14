import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import { userSignOut } from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

export default function Navbar() {

  const currentUser = useSelector((state: RootState) => state.auth.currentUser)

  async function signOut() {
    await userSignOut()
    window.location.reload()
  }

  return (
    <div className="bg-gray-900 px-6 h-20 flex items-center justify-between rounded-tl-2xl">
      {currentUser && <div className="flex items-center">
        <LazyLoadImage effect="blur" className="object-cover w-14 h-14 rounded-full" src={currentUser.photoURL} />
        <span className="text-white text-lg font-bold ml-4" >{currentUser.displayName}</span>
      </div>}
      <button onClick={signOut} className="text-sm font-bold px-3 py-2 bg-gray-800 rounded-2xl text-white">SignOut</button>
    </div>
  )
}