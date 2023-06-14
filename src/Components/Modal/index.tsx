import { FC } from "react";
import { ModalProps } from "../../types";

const Modal: FC<ModalProps> = ({active, setActive, children}) => {
  return (
    <div 
      onClick={() => setActive(false)} 
      className={active
        ? "h-screen w-screen bg-black bg-opacity-50 fixed top-0 left-0 flex items-center justify-center transition-all duration-300"
        : "h-screen w-screen bg-black bg-opacity-50 fixed top-0 left-0 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300"
      } 
    >
      <div onClick={e => e.stopPropagation()} className="[&>img]:max-h-[calc(500px-1px)] [&>img]:max-w-[calc(700px-1px)]">
        {children}
      </div>
    </div>
  )
}

export default Modal;