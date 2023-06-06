import {Link, Navigate} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axios from "axios";

export default function Signup() {
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
            .then(({data}) => {
                console.log(data);
                setUser(data.user);
                setToken(data.token);
                return <Navigate to='/dashboard'/>
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

    function constructError(element, message) {
        const errorID = element.getAttribute('id') + "-error-message";
        if (!document.getElementById(errorID)) {
            let div = document.createElement('div');
            div.innerHTML = message;
            div.classList.add('errorMessage');
            div.setAttribute('id', errorID)
            element.parentNode.insertBefore(div, element.nextSibling);
        }
    }

    function destroyError(element) {
        const errorID = element.getAttribute('id') + "-error-message";
        const errorDiv = document.getElementById(errorID);
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function checkName() {
        const element = document.getElementById('name');
        if (element.value === null) {
            constructError(element, "No Name Entered!")
        } else if (!element.value.match(/^[a-zA-Z\s]+$/g)) {
            constructError(element, "No Non-alphabetical Characters!")
        } else {
            destroyError(element)
        }
    }

    function checkPasswords() {
        const password = document.getElementById('password');
        const passwordConfirmation = document.getElementById('passwordconfirmation')
        if (password.value !== passwordConfirmation.value) {
            constructError(passwordConfirmation, "Passwords Don't Match!")
        } else {
            destroyError(passwordConfirmation)
        }

    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Sign Up
                    </h1>
                    <input required onKeyUp={checkName} id="name" ref={nameRef} type="text" placeholder="Name"/>
                    <input required id="email" ref={emailRef} type="email" placeholder="Email"/>
                    <input required id="password" onKeyUp={checkPasswords} ref={passwordRef} type="password"
                           placeholder="Password"/>
                    <input required id="passwordconfirmation" onKeyUp={checkPasswords} ref={passwordConfirmationRef}
                           type="password" placeholder="Password Confirmation"/>
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
