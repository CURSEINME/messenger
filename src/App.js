import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import "./index.css"

import SignIn, { action as signInAction } from "./Pages/SignIn";
import SignUp, { action as signUpAction} from "./Pages/SignUp";
import Home, { action as chatAction} from "./Pages/Home";
import { requareAuth } from "./utils";


const router = createHashRouter(createRoutesFromElements(
  <Route path="/">
    <Route
      index
      element={<Home/>}
      loader={() => requareAuth()}
      action={chatAction}
    />
    <Route
      path="signIn"
      element={<SignIn/>}
      // loader={() => requareAuth()}
      action={signInAction}
      />
    <Route 
      path="signUp"
      element={<SignUp/>}
      // loader={() => requareAuth()} 
      action={signUpAction} 
    />
  </Route>
))

function App() {
  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;