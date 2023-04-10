import {Outlet, Navigate, Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function DefaultLayout() {
    const {user, token} = useStateContext()
    if (!token) {
        return <Navigate to='/login'/>
    }
    const onLogout = (ev) =>{
        ev.default();
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
                        <a href={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
