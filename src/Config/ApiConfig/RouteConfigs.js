
import { Navigate } from "react-router-dom";
const Routes = [
  {
    key: "login",
    path: '/auth/login',
    element: <ChangePassword />,
    renderLayout: false
  },
  {
    key: "default",
    path: '/',
    element: <Navigate to="/auth/login" replace={true} />,
    renderLayout: false
  },
  {
    key: "general",
    path: '*',
    element: <Navigate to="/auth/login" replace={true} />,
    renderLayout: false
  }
]

export default Routes