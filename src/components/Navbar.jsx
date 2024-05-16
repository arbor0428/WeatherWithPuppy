import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    //로그인 되어 있을 시 displayName 가져오기
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
            if (user) {
                setUserName(user.displayName);
            } else {
                setUserName('');
            }
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // 로그아웃 후 필요한 작업을 추가. 예: 페이지 다시로딩
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/">Logo</Link>
            </div>
            <div className="navbar__logout">
                {isLoggedIn ? (
                    <div className='navbar__user'>
                        <div className='navbar__user__name'>
                            <FaRegUser />
                            <span>{userName}</span>
                        </div>
                        <button className='navbar__userbtn' onClick={handleLogout}>로그아웃</button>
                    </div>
                ) : (
                    <Link className="navbar__userbtn" to="/LoginPage">로그인</Link>
                )}
            </div>
        </nav>
    );
}

