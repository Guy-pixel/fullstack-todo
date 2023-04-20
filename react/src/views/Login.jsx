import {Link} from "react-router-dom";
import {useRef} from "react";
import axiosClient from "../axios-client.js";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({data})=>{
                if(data){
                    localStorage.setItem('user', JSON.stringify(data));
                    localStorage
                }
                if()
            })
            .catch(error => {
                console.log(error);
            })
    }
    return(
    <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form onSubmit={onSubmit}>

                <h1 className="title">
                    Login
                </h1>
                <input ref={emailRef} type="email" placeholder="Email"/>
                <input ref={passwordRef} type="password" placeholder="Password"/>
                <button type="submit" className="btn btn-block">
                    Login
                </button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>

    </div>
    )
}
