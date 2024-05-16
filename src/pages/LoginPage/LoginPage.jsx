import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { Link, useNavigate } from 'react-router-dom';


export default function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //유효성검사
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!loginEmail.trim()) {
            formErrors.loginEmail = "이메일을 입력해주세요.";
            isValid = false;
        }

        if (!loginPassword.trim()) {
            formErrors.loginPassword = "비밀번호를 입력해주세요.";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const login = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            );
            console.log(user);

            alert("로그인이 성공했습니다."); // 로그인이 성공했을 때 alert 창 표시
            navigate("/SearchWeather"); //이후 페이지 이동

        } catch (error) {

            if (error.code === "auth/invalid-email") {
                alert("이메일 주소가 올바르지 않습니다.");
            } else if (error.code === "auth/wrong-password") {
                alert("비밀번호가 올바르지 않습니다.");
            } else {
                alert("로그인에 실패했습니다.");
            }
            
        }
    };

    return (
        <div className='register'>
            <h2 className='register__title'>로그인</h2>
            <div className='register__form'>
                <form action="">
                    <div className={`register__form__inputbox ${errors.loginEmail ? 'error' : ''}`}>
                        <label htmlFor="loginemail">이메일</label>
                        <input 
                            id="loginemail" 
                            type="email" 
                            placeholder='이메일' 
                            onChange={(event) => {setLoginEmail(event.target.value);}} 
                        />
                    </div>
                    {errors.loginEmail && <p className='register__form__errormessage'>* {errors.loginEmail}</p>}
                    <div className={`register__form__inputbox ${errors.loginPassword ? 'error' : ''}`}>
                        <label htmlFor="loginpassword">비밀번호</label>
                        <input 
                            id="loginpassword" 
                            type="password" 
                            placeholder='비밀번호' 
                            onChange={(event) => {setLoginPassword(event.target.value);}} 
                        />
                    </div>
                    {errors.loginPassword && <p className='register__form__errormessage'>* {errors.loginPassword}</p>}
                    <button className='btn' type='submit' onClick={login}> 로그인</button>
                </form>
                <Link className="btn" to='/RegisterPage'>
                    회원가입하기
                </Link>
            </div>
        </div>
    );
}
