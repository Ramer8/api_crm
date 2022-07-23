import { Outlet } from "react-router-dom"
const LogIn = () => {
    return (
        <div>
            <h1>LogIn.jsx with outlet</h1>
            <h1>before outlet</h1>
            <Outlet />
            <h1>after outlet</h1>
        </div>
    )
}
export default LogIn