import { Form, redirect, useActionData, Link } from "react-router-dom";
import { signUp } from "../../api";

export async function action({request}) {
  const formData = await request.formData()

  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")
  const photoURL = formData.get("imageUrl")

  try {
    if (name.length > 10) {
      throw new Error("Name too long, max 10 symbols")
    }
    
    const url = new URL(photoURL)

    if (photoURL.length >= 200) {
      throw new Error("ImageUrl too long")
    }

    await signUp({name, email, password, photoURL})

    return redirect("/")
  } catch(err) {
    return err.message
  }
}

export default function SignUp() {

  const errorMessage = useActionData()

  return (
    <div className="p-8 max-h-w-5/6 bg-indigo-400 absolute top-1/2 left-1/2 -ml-56 -mt-56 rounded-2xl">
      <h1 className= "text-center text-3xl font-semibold mb-10 text-white">Create your account</h1>
      {errorMessage && <h2 className="text-red-500 text-xl font-bold text-center mb-8">{errorMessage}</h2>}
      <Form className="flex-col flex gap-5" method="post">
        <input
          className="w-96 px-5 py-1 rounded-2xl"
          name="name"
          type="text"
          placeholder="Nickname"
        />
        <input
          className="w-96 px-5 py-1 rounded-2xl"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="px-5 py-1 rounded-2xl"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="true"
        />
        <input
          className="px-5 py-1 rounded-2xl"
          name="imageUrl"
          type="text"
          placeholder="ImageUrl"
        />
        <button className="mt-5 mb-5 text-lg bg-indigo-700 text-white self-center px-4 py-2 rounded-2xl">Sign Up</button>
      </Form>
      <div className="text-white text-sm">
        <span>Already have account? </span>
        <Link to="/signIn">Sign In</Link>
      </div>
    </div>
  )
}