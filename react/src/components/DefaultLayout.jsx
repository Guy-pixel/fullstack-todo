import {Outlet, Navigate, Link, useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function DefaultLayout() {
    const {user, token} = useStateContext()
    let navigate = useNavigate();
    if (!localStorage.getItem('token')) {
        return <Navigate to='/login'/>;
    }
    const onLogout = (ev) =>{
        localStorage.clear();
        navigate('/login');
    }

    function refreshToken(refreshToken){
        localStorage.removeItem('token');
        axios.post();
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
