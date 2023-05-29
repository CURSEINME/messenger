import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements
} from "react-router-dom";
import "./index.css"

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp"; 
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react"
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";


const router = createHashRouter(createRoutesFromElements(
  <Route path="/">
    <Route
      index
      element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }
    />
    <Route
      path="signIn"
      element={<SignIn/>}
    />
    <Route 
      path="signUp"
      element={<SignUp/>}
    />
  </Route>
))

function App() {

  const dispatch = useDispatch()


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        localStorage.setItem("loggedIn", true)

        dispatch({type:"CHANGE_ CURRENTUSER", payload: user})
      } else {
        localStorage.removeItem("loggedIn")
      }
    })
  }, [])

  return (
    <RouterProvider router={router} />
  );
}

export default App;