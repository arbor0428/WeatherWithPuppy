
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase"
import { useState } from 'react';

export default function RegisterPage() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
            );
            console.log(user)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='register__form'>
            <h2>회원가입</h2>
            <form>
                <div>
                    <input type="email" placeholder='이메일' onChange={(event) => {setRegisterEmail(event.target.value);}}/>
                </div>
                <div>
                    <input type="password" placeholder='비밀번호' onChange={(event) => {setRegisterPassword(event.target.value);}} />
                </div>
                <button onClick={register}>회원가입</button>
            </form>
        </div>
    );
}

