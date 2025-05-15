import Login from "./pages/login/Login"
import { createBrowserRouter, Navigate} from "react-router-dom";
import ProtectedPage from "./Protected";


const router = createBrowserRouter([
    {path: "/", element: <Navigate to="/tracking/login" replace />},
    {path: "/tracking", element: "",
    children: [
        {path: "/login", element: <Login/>},
        {path: "/processos", element: <ProtectedPage/>}
    ]
    }
    // draft
    // {path: "/draft/login"},
    // {path: "draft/processos"}

])

export default router;