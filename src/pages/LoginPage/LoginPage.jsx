import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase"


export default function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='login__form'>
            <form action="">
                <input type="email" placeholder='이메일' onChange={(event) => {setLoginEmail(event.target.value);}} />
                <input type="password" placeholder='비밀번호' onChange={(event) => {setLoginPassword(event.target.value);}} />
                <button type='submit' onClick={login}> 로그인</button>
            </form>
        </div>
    );
}

