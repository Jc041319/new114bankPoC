import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcEngineering } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

const SignInUser = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prevState => !prevState);

    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        userid: '',
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const [formDataBP, setFormDataBP] = useState({
        username: '',
        password: '',
    });


    const handleChangeBP = (e) => {
        const { name, value } = e.target;
        setFormDataBP((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const showAlertMessage = (message) => {
        setShowAlert(true);

        // Automatically hide the alert after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_114BK_API_URL;
            const url = apiUrl + "api/auth/login";
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(activeTab === 0 ? formData : formDataBP),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setLoading(false);


            if (response.status === 200) {
                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.setItem("idToken", data.idToken);
                sessionStorage.setItem("refreshToken", data.refreshToken);
                navigate('/home', {
                    state: {
                        username: activeTab === 0 ? formData.username : formDataBP.username,
                    }
                });

            } else {
                console.log("data: ", data);
                setError(data.error); // Set error message if request fails
                showAlertMessage(data.error);
            }

        } catch (error) {
            setError(error.message); // Set error message if request fails
            showAlertMessage(error.message);
        } finally {
            setLoading(false); // Set loading state to false once the request finishes
        }
    };

    const styles = {
        container: {
            fontFamily: "sans-serif",
            textAlign: "center",
            padding: "20px",
        },
        title: {
            marginBottom: "20px",
            fontSize: "24px",
        },
        table: {
            width: "80%",
            margin: "0 auto",
            borderCollapse: "collapse",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
        header: {
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px",
            border: "1px solid #ddd",
        },
        row: {
            backgroundColor: "#f9f9f9",
        },
        cell: {
            padding: "10px",
            border: "1px solid #ddd",
        },
        button: {
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
        },
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(238,236,225, 0.6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        spinner: {
            fontSize: "50px",
            color: "#A6121F",
            animation: "spin 1.5s linear infinite",
        },
        loadingText: {
            color: "#A6121F",
            marginTop: "10px",
            fontSize: "16px",
        },
    };

    return (
        <div className="content-container">
            <div className="min-h-screen flex justify-center items-center bg-[#FEF3F3]">

                {loading && (
                    <div style={styles.overlay}>
                        {/* <FaSpinner style={styles.spinner} />
          <p style={{ color: "#fff" }}>Loading...</p> */}
                        <FcEngineering style={styles.spinner} />
                        <p style={styles.loadingText}>Loading, Please wait...</p>
                    </div>
                )}



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

                        {showAlert && (
                            <div
                                role="alert"
                                className="mt-3 mb-3 relative flex flex-col w-full p-3 text-sm  bg-[#FEF3F3] rounded-md border-[#F23030] border-l-4"
                            >
                                <p className="flex text-base text-[#BC1C21] font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="h-5 w-5 mr-2 mt-0.5"
                                    >
                                        <path

                                            fillRule="evenodd"
                                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Errors
                                </p>
                                <ul className="list-disc">
                                    <li className="text-[#F56060] font-semibold ml-10 p-3">
                                        <p className="p-1 text-[#F56060] font-normal">{error}</p>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <h2 className="text-xl font-normal text-center mb-4 mt-4 text-gray-700" >ログイン</h2>
                        <div className="max-w-4xl mx-auto p-4">
                            <div className="tabs">
                                {/* Tab navigation */}
                                <div className="tab-list flex space-x-1 justify-center">
                                    <button
                                        className={`tab-title  text-lg font-normal w-1/2 ${activeTab === 0
                                            ? 'text-red-600 border-b-2 border-red-600'
                                            : 'text-gray-500 border-b-2 border-gray-400'
                                            }`}
                                        onClick={() => setActiveTab(0)}
                                    >
                                        114Salut StationのID
                                    </button>
                                    <button
                                        className={`tab-title  text-lg font-normal w-1/2 ${activeTab === 1
                                            ? 'text-red-600 border-b-2 border-red-600'
                                            : 'text-gray-500 border-b-2 border-gray-400'
                                            }`}
                                        onClick={() => setActiveTab(1)}
                                    >
                                        ビジネスポータルのID
                                    </button>
                                </div>

                                {/* Tab content */}
                                <div className="tab-content mt-10">
                                    {activeTab === 0 && (


                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <h2 className="text-lg font-normal text-center mb-8 mt-4 text-gray-700" >114Salut Station連携済のお客様</h2>
                                            </div>
                                            <div>
                                                <label htmlFor="userid" className="block text-sm font-normal">契約者番号 (114Salut Station)</label>
                                                <input
                                                    type="text"
                                                    name="userid"
                                                    id="userid"
                                                    value={formData.userid}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="username" className="block text-sm font-normal">利用者ID (114Salut Station)</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="password" className="block text-sm font-normal">ログインパスワード (114Salut Station)</label>
                                                <input
                                                    type={isVisible ? "text" : "password"}
                                                    name="password"
                                                    id="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                    required
                                                />
                                                <button
                                                    className="absolute pt-6 inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-red-500 hover:text-red-500 transition-colors"
                                                    type="button"
                                                    onClick={toggleVisibility}
                                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                                    aria-pressed={isVisible}
                                                    aria-controls="password"
                                                >
                                                    {isVisible ? (
                                                        <EyeOff size={20} aria-hidden="true" />
                                                    ) : (
                                                        <Eye size={20} aria-hidden="true" />
                                                    )}
                                                </button>
                                            </div>


                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="w-full h-full py-3 bg-red-600 text-white rounded-full  mt-4"
                                                >
                                                    ログイン
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeTab === 1 && (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="username" className="block text-sm font-normal">ユーザーID (ビジネスポータル)</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={formDataBP.username}
                                                    onChange={handleChangeBP}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="password" className="block text-sm font-normal">ログインパスワード (ビジネスポータル)</label>
                                                <input
                                                    type={isVisible ? "text" : "password"}
                                                    name="password"
                                                    id="password"
                                                    value={formDataBP.password}
                                                    onChange={handleChangeBP}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                    required
                                                />
                                                <button
                                                    className="absolute pt-6 inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-red-500 hover:text-red-500 transition-colors"
                                                    type="button"
                                                    onClick={toggleVisibility}
                                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                                    aria-pressed={isVisible}
                                                    aria-controls="password"
                                                >
                                                    {isVisible ? (
                                                        <EyeOff size={20} aria-hidden="true" />
                                                    ) : (
                                                        <Eye size={20} aria-hidden="true" />
                                                    )}
                                                </button>

                                            </div>
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="w-full h-full py-3 bg-red-600 text-white rounded-full  mt-4"
                                                >
                                                    ログイン
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center '>
                            <Link
                                to="/forgot-password"
                                className="mt-2 px-6 py-2 font-normal text-sm bg-transparent text-red-600  hover:text-red-800"
                            >
                                {/* 契約者番号、ユーザーID、 ログインパスワードをお忘れの方 &gt; */}
                                ログインパスワードをお忘れの方 &gt;
                            </Link>

                        </div>
                        <div className=' items-center justify-center mt-10'>
                            <Link
                                to="/"
                                className="mt-2 px-6 py-3 rounded-full border-2 border-red-600 font-normal text-sm bg-transparent text-red-600  hover:text-red-800"
                            >
                                戻る
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInUser;



