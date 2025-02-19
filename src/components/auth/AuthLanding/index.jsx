import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthLanding = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        code: '',
    });

    const navigate = useNavigate();


    const goToSignIn = () => {
        navigate("/sign-in"); // Navigate to home page
    };

    const goToSignUp = () => {
        navigate("/sign-up"); // Navigate to home page
    };

    const goToChangePassword = () => {
        navigate("/change-password"); // Navigate to home page
    };

    const goToUserConfirmation = () => {
        navigate("/user-confirmation"); // Navigate to home page
    };






    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);  // Handle API response here
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };





    return (
        <div className="content-container">
            <div className="min-h-screen flex justify-center items-center bg-[#FEF3F3]">
                <div className="w-full max-w-xl p-8">

                    <div className="flex items-center justify-center space-x-2">

                        <img src="https://cdn.zonebourse.com/static/instruments-logo-6492265" className="h-5 w-5 mb-4" alt="" />
                        <h2 className="text-xl font-semibold text-center text-black mb-4">
                            百十四銀行
                            <span className="text-xl font-semibold text-center text-red-500">
                                ビジネスポータル
                            </span>
                        </h2>
                    </div>


                    <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-xl font-normal text-center mb-4 mt-4 text-gray-700" >法人ビジネスポータル</h2>
                        {/* <p className="text-sm font-normal text-center mb-4 mt-4 text-gray-700" >
                            ご指定のメールアドレスにメールを送信しました。<br />
                            メールに記載された認証コードを入力してください。
                        </p> */}

                        <div className="max-w-4xl mx-auto p-4">


                            <div className="text-center">
                                <button
                                    onClick={goToSignIn}
                                    className="w-full h-full mt-2 mb-2 px-2 py-3 rounded-full border-2 border-red-600 font-normal text-sm bg-red-600 text-white  hover:text-red-600 hover:bg-transparent"
                                >
                                    ログイン
                                </button>
                            </div>


                            <div className="text-center">
                                <button
                                    onClick={goToSignUp}
                                    className="w-full h-full mt-2 mb-2 px-2 py-3 rounded-full border-2 border-red-600 font-normal text-sm bg-red-600 text-white  hover:text-red-600 hover:bg-transparent"
                                >
                                    サインアップ
                                </button>
                            </div>

                            {/* <div className="text-center">
                                <button
                                    onClick={goToChangePassword}
                                    className="w-full h-full mt-2 mb-2 px-2 py-3 rounded-full border-2 border-red-600 font-normal text-sm bg-red-600 text-white  hover:text-red-600 hover:bg-transparent"
                                >
                                    パスワード変更
                                </button>
                            </div> */}

                            <div className="text-center">
                                <button
                                    onClick={goToUserConfirmation}
                                    className="w-full h-full mt-2 mb-2 px-2 py-3 rounded-full border-2 border-red-600 font-normal text-sm bg-red-600 text-white  hover:text-red-600 hover:bg-transparent"
                                >
                                    ユーザー認証
                                </button>
                            </div>




                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLanding;


