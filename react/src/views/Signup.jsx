import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axios from "axios";

export default function Signup()
{
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [password, setPassword] = useState();
    const [confirmationPassword, setConfirmationPassword] = useState();
    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/register', payload)
            .then(({data})=>{
                console.log(data);
                setUser(data.user);
                setToken(data.token);
            })
            .catch(error => {
                console.log(error);
                const response = error.response;
                // if(response && response.status===422){
                //     console.log(response.data.errors);
                // }

            })
    }
    let passwordMatch = true;
    function checkPasswords(){
        setConfirmationPassword()
        if(passwordRef.current.value !== passwordConfirmationRef.current.value){
            passwordRef.html('test1')
            console.log('hit1')
        } else {
            passwordRef.html('test2')
            console.log('hit2')
        }
    }
    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Sign Up
                    </h1>
                    <input ref={nameRef} type="text" placeholder="Name"/>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input onChange={checkPasswords} ref={passwordRef} type="password" placeholder="Password"/>
                    <input onChange={checkPasswords} ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                    <div id="passwordMismatch">Message</div>
                    <button type="submit" className="btn btn-block">
                        Signup
                    </button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}
