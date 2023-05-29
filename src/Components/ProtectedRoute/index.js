import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
  const isLoggedIn = localStorage.getItem("loggedIn")
  if (!isLoggedIn) {
    return <Navigate to="/signIn" />
  } else {
    return children
  }
}