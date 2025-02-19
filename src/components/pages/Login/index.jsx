import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;  // only allow digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus(); // auto-focus to the next input
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Focus on previous input field if backspace is pressed on empty input
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    try {
      // Make a POST request to the API to verify OTP
      // const response = await axios.post('/api/verify-otp', { otp: otpCode });

      const apiUrl = import.meta.env.VITE_API_URL + "/otp/verify";
      const payload = { otp: otpCode };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });



      console.log("otp:", otpCode)
      console.log("response:", response)

      if (response.status === 200) {
        // const data = await response.json();
        // sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("authToken", encodeBase64(otpCode));
        setIsAuthenticated(true);
        goToHome();
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Error during OTP verification');
    }
  };

  const goToHome = () => {
    navigate('/home');
  };

  const encodeBase64 = (token) => {
    try {
      return btoa(token); // btoa() encodes a string to Base64
    } catch (e) {
      console.error("Encoding failed:", e);
      return null;
    }
  };

  return (


    <div className="content-container">
      <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          {/* <h2 className="text-2xl font-semibold text-center mb-4">Login</h2> */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
            <p className="text-[15px] text-slate-500">Enter the 6-digit verification code.</p>
          </div>


          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-xl text-center border rounded-md focus:outline-none"
                />
              ))}
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
