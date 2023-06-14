import { useEffect, useState } from "react"
import { sendMessage } from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { FormData } from "../../types";

export default function Input() {

  const defaultFromData = {
    message: "",
    img: null
  }

  const [formData, setFormData] = useState<FormData>(defaultFromData)
  const [preview, setPreview] = useState<string>("")
  const [randomString, setRandomString] = useState("")

  const data = useSelector((state: RootState) => state.chat)

  function handleChange(event) {

    const { name, value, files } = event.target

    if (files) {
      if (files.size > 8000000) {
        alert("Image picture more than 8mb")
      } else {
        setFormData(prev => {
          return {
            ...prev,
            [name]: files[0]
          }
        })
      }
    } else {
      setFormData(prev => {
        return {
          ...prev,
          [name]: value
        }
      })
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    
    const message = formData.message
    const img = formData.img

    setFormData(prev => {
      return {
        ...prev,
        message: "",
        img: null
      }
    })

    try {
      const chatId = data.chatId
      const userId = data.user?.uid

      if (chatId && message && userId) {
        await sendMessage({chatId, message, userId, img})
        resetInput()

      } else return null
    } catch(err) {
      return null
    }
  }
  
  function resetInput() {
    let randomString = Math.random().toString(36)

    setRandomString(randomString)
  }

  useEffect(() => {
    if (formData.img) {
      const reader = new FileReader()

      reader.readAsDataURL(formData.img)

      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
    } else {
      setPreview("")
    }
  },[formData.img])

  return (
    <div>
      {preview && <img className="w-32 rounded-2xl m-5" src={preview} />}
      <form className="flex" onSubmit={handleSubmit} method="post">
        <input 
          onChange={handleChange}
          value={formData.message}
          type="text" 
          name="message" 
          placeholder="your message" 
          className="bg-gray-800 px-6 h-20 w-full text-white text-2xl focus:outline-none" 
        />
        <label className="flex items-center">
          <img 
            className="w-20 h-20 bg-gray-800 object-fill p-5 rounded-br-2xl"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Wlm-icon-upload-white.svg/1024px-Wlm-icon-upload-white.svg.png" 
          />
          <input
            key={randomString}
            className="file: hidden"
            accept=".png, .jpeg, .jpg, .svg"
            onChange={handleChange}
            type="file"
            name="img"
          />
        </label>
      </form>
    </div>
  )
}