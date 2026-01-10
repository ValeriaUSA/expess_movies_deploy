import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext"
import Login from "../views/Login"
import Register from "../views/Register"


const AppRoutes = () => {
  const { IsAuthenticated } = useContext(GlobalContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default AppRoutes



