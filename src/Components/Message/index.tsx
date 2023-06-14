import { useSelector } from "react-redux";
import { FC, useState } from "react"
import Modal from "../Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { MessageProps } from "../../types";
import { RootState } from "../../Store/store";

const Message: FC<MessageProps> = ({messageData}) => {

  const userData = useSelector((state: RootState) => state.chat)
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)

  const [modalActive, setModalActive] = useState(false)

  return (
    <div className="flex flex-col p-4" >
      <div  className={messageData.senderId == currentUser?.uid
        ? "flex flex-row-reverse gap-2"
        : "flex gap-2"}>
        {messageData.senderId == userData.user?.uid
          ? <LazyLoadImage effect="blur" className="object-cover h-12 w-12 rounded-full" src={userData.user?.photoURL}/> 
          : <LazyLoadImage effect="blur" className="object-cover h-12 w-12 rounded-full" src={currentUser?.photoURL} /> }
        <p 
          className="text-2xl font-bold text-white px-3 pt-1 bg-gray-800 rounded-full">
          {messageData.message}
        </p>
      </div >
      <div className={messageData.senderId == currentUser?.uid ? "flex flex-row-reverse pr-14" : "pl-14"}>
        {
          messageData.photoURL && 
          <LazyLoadImage 
            effect="blur" 
            onClick={() => setModalActive(true)} 
            className="rounded-2xl object-cover max-w-xs max-h-40 mt-5"
            src={messageData.photoURL} 
          />
        }
      </div>
      <Modal active={modalActive} setActive={setModalActive} children={<img src={userData.user?.photoURL} />} />
    </div>
  )
}

export default Message;