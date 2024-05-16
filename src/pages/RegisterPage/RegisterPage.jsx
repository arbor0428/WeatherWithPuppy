import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref as dbRef, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, database, storage } from "../../api/firebase";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [displayName, setDisplayName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL 추가
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);

            // 이미지 미리보기 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    //유효성검사

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!displayName.trim()) {
            formErrors.displayName = "이름을 입력해주세요.";
            isValid = false;
        }

        if (!registerEmail.trim()) {
            formErrors.registerEmail = "이메일을 입력해주세요.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
            formErrors.registerEmail = "올바른 이메일 형식을 입력해주세요.";
            isValid = false;
        }

        if (!registerPassword.trim()) {
            formErrors.registerPassword = "비밀번호를 입력해주세요.";
            isValid = false;
        } else if (registerPassword.length < 6) {
            formErrors.registerPassword = "비밀번호는 최소 6자리여야 합니다.";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const register = async (e) => {
        e.preventDefault();  // 폼 제출의 기본 동작을 막습니다.
        
        if (!validateForm()) {
            return;
        }

        try {
            // 사용자 생성
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
            );
            const user = userCredential.user;
            console.log(user);

            // 이미지 업로드 및 URL 가져오기
            let photoURL = 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png'; // 기본 이미지
            if (image) {
                const imageRef = storageRef(storage, `profileImages/${user.uid}`);
                await uploadBytes(imageRef, image);
                photoURL = await getDownloadURL(imageRef);
                console.log("Uploaded Image URL:", photoURL); // 업로드된 이미지 URL 확인용
            }

            // 프로필 업데이트
            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL,
            });

            // 데이터베이스에 사용자 정보 저장
            await set(dbRef(database, `users/${user.uid}`), {
                name: displayName,
                image: photoURL,
            });

            alert('회원가입이 완료되었습니다.');
            navigate("/LoginPage");

        } catch (error) {
            alert(error.message); // 오류 메시지를 alert 창에 표시
        }
    }

    return (
        <section className='register'>
            <h2 className='register__title'>회원가입</h2>
            <div className='register__form'>
                <form onSubmit={register}>
                    {imagePreview && (
                        <img className='register__form__imagepreview' src={imagePreview} alt="이미지 미리보기" style={{ maxWidth: '200px' }} />
                    )}
                    <div className='register__form__inputbox'>
                        <label htmlFor="puppyimg">강아지 사진</label>
                        <input 
                            id="puppyimg"
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className={`register__form__inputbox ${errors.displayName ? 'error' : ''}`}>
                        <label htmlFor="puppyname">강아지 이름</label>
                        <input
                            id="puppyname"
                            type="text"
                            placeholder="이름"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                    {errors.displayName && <p className='register__form__errormessage' >* {errors.displayName}</p>}

                    <div className={`register__form__inputbox ${errors.registerEmail ? 'error' : ''}`}>
                        <label htmlFor="email">이메일</label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder='이메일' 
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                    </div>
                    {errors.registerEmail && <p className='register__form__errormessage'>* {errors.registerEmail}</p>}

                    <div className={`register__form__inputbox ${errors.registerPassword ? 'error' : ''}`}>
                        <label htmlFor="password">비밀번호</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder='비밀번호' 
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                    </div>
                    {errors.registerPassword && <p className='register__form__errormessage'>* {errors.registerPassword}</p>}

                    <button className='btn' type="submit">회원가입</button>
                </form>
            </div>
        </section>
    );
}
