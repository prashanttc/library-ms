import './index.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"
        element={<Homepage />}>
      </Route>

      <Route path="/login"
        element={<Login />}>
      </Route>
      <Route path="/sign-up"
        element={<SignUp/>}>
      </Route>
  
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  )
}

export default AppRoutes;

