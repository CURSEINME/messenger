import { signIn } from "../../api";
import { 
  Form,
  Link, 
  redirect,
  useActionData
} from "react-router-dom";

export async function action({request}) {

  console.log("test")
  const formData = await request.formData()

  const email = formData.get("email")
  const password = formData.get("password")

  try {
    await signIn({email, password})

    return redirect("/")
  } catch(err) {
    return err.message
  }
}

export default function SignIn() {

  const errorMessage = useActionData()

  return (
    <div className="w-auto p-8 max-h-w-5/6 bg-indigo-400 absolute top-1/2 left-1/2 -ml-48 -mt-48 rounded-2xl">
      <h1 className="text-center text-3xl font-semibold mb-10 text-white">Login in your account</h1>
      {errorMessage && <h2 className="text-red-500 text-xl font-bold text-center mb-8">{errorMessage}</h2>}
      <Form className="flex-col flex gap-10" method="post">
        <input
          className="w-96 px-5 py-2 rounded-2xl"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="w-96 px-5 py-2 rounded-2xl"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="true"
        />
        <button className="mt-12 mb-5 text-xl bg-indigo-700 text-white self-center px-4 py-2 rounded-2xl">Sign In</button>
      </Form>
      <div className="text-white text-sm">
        <span>Not have account? </span>
        <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
  )
}