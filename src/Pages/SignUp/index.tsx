import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { signUp } from "../../api";
import { SignUpForm } from "../../types";

export default function SignUp() {

  const defaultState = {
    name: "",
    email: "",
    password: "",
    img: null
  }

  const [formData, setFormData] = useState<SignUpForm>(defaultState)
  const [error, setError] = useState<string>()

  const navigate = useNavigate()

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

    const { name, email, password, img } = formData

    try {
      if (name.length > 20) {
        throw new Error("Name too long")
      } else if (!img) {
        throw new Error("Please select image")
      } else {
        await signUp({name, email, password, img})
      }
      navigate("/")
    } catch(err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-8 max-h-w-5/6 bg-gray-700 absolute top-1/2 left-1/2 -ml-56 -mt-56 rounded-2xl">
      <h1 className= "text-center text-3xl font-semibold mb-10 text-white">Create your account</h1>
      {error && <h2 className="text-red-500 text-xl font-bold text-center mb-8">{error}</h2>}
      <form onSubmit={handleSubmit} className="flex-col flex gap-5" method="post">
        <input
          className="w-96 px-5 py-1 rounded-2xl bg-gray-800 text-white focus:ring-2 focus:ring-gray-900 focus:outline-none hover:bg-opacity-75"
          onChange={handleChange}
          value={formData.name}
          name="name"
          type="text"
          placeholder="Nickname"
        />
        <input
          className="w-96 px-5 py-1 rounded-2xl bg-gray-800 text-white focus:ring-2 focus:ring-gray-900 focus:outline-none hover:bg-opacity-75"
          onChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="px-5 py-1 rounded-2xl bg-gray-800 text-white focus:ring-2 focus:ring-gray-900 focus:outline-none hover:bg-opacity-75"
          onChange={handleChange}
          value={formData.password}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="true"
        />
        <input
          className="file:border-0 file:bg-gray-800 file:text-white file:px-4 file:py-1 file:rounded-2xl file:mr-5 file: text-white hover:file:bg-opacity-75"
          onChange={handleChange}
          name="img"
          type="file"
          placeholder="ImageUrl"
        />
        <button type="submit" className="mt-5 mb-5 text-lg bg-gray-900 text-white self-center px-4 py-2 rounded-2xl hover:bg-opacity-75">Sign Up</button>
      </form>
      <div className="text-white text-sm">
        <span>Already have account? </span>
        <Link to="/signIn">Sign In</Link>
      </div>
    </div>
  )
}