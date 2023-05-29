import { useEffect, useState } from "react"
import { sendMessage } from "../../api";
import { useSelector } from "react-redux";

export default function Input() {

  const [formData, setFormData] = useState({
    message: "",
    img: ""
  })

  const [preview, setPreview] = useState()

  const [randomString, setRandomString] = useState()

  const data = useSelector(state => state.chat)

  function handleChange(event) {

    const { name, value, files } = event.target

    if (files) {
      setFormData(prev => {
        return {
          ...prev,
          [name]: files[0]
        }
      })
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
      if (data.chatId && message) {
        await sendMessage(data.chatId, message, data.user.uid, img)
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
        setPreview(reader.result)
      }
    } else {
      setPreview(null)
    }
  },[formData.img])

  return (
    <div className="">
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