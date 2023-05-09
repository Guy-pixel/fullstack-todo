import {Outlet, Navigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {
    const {token} = useStateContext()
    if(localStorage.getItem('token')){
        return <Navigate to="/"/>
    }
    return(
    <div>

        <Outlet/>
    </div>
    )
}
