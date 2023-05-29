import { signIn } from "../../api";
import { 
  Link,
  useNavigate, 
} from "react-router-dom";
import { useState } from "react"

export default function SignIn() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState()

  const navigate = useNavigate()

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

    try {
      const { email, password } = formData

      await signIn(email, password)

      navigate("/")
    } catch(err) {
      setError(err.message)
    }
  }

  return (
    <div className="w-auto p-8 max-h-w-5/6 bg-gray-700 absolute top-1/2 left-1/2 -ml-56 -mt-56 rounded-2xl">
      <h1 className="text-center text-3xl font-semibold mb-10 text-white">Login in your account</h1>
      {error && <h2 className="text-red-500 text-xl font-bold text-center mb-8">{error}</h2>}
      <form onSubmit={handleSubmit} className="flex-col flex gap-10" method="post">
        <input
          className="w-96 px-5 py-2 rounded-2xl bg-gray-800 text-white focus:ring-2 focus:ring-gray-900 focus:outline-none hover:bg-opacity-75"
          onChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="w-96 px-5 py-2 rounded-2xl bg-gray-800 text-white focus:ring-2 focus:ring-gray-900 focus:outline-none hover:bg-opacity-75"
          onChange={handleChange}
          value={formData.password}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="true"
        />
        <button
          type="submit"
          className="mt-12 mb-5 text-xl bg-gray-900 text-white self-center px-4 py-2 rounded-2xl hover:bg-opacity-75">
          Sign In
        </button>
      </form>
      <div className="text-white text-sm">
        <span>Not have account? </span>
        <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
  )
}