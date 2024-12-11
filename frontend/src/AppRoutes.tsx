import './index.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoutes from './ProtectedRoutes';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login"
        element={<Login />}>
      </Route>
      <Route path="/sign-up"
        element={<SignUp/>}>
      </Route>
  
<Route element={<ProtectedRoutes/>}>
<Route path='/' element={<Homepage/>}>
</Route>
</Route>

      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  )
}

export default AppRoutes;

