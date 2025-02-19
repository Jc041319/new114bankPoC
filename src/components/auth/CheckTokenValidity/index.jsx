// src/components/ForgotPassword.js
import React, { useState } from 'react';

const CheckTokenValidity = () => {
    const [token, setToken] = useState('');




    const handleCheckValidity = async (e) => {
        try {

            e.preventDefault();
            console.log('Check Access Token Validity:', token);

            const apiUrl = import.meta.env.VITE_114BK_API_URL;
            const url = apiUrl + "api/auth/check-token-validity";
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "x-auth-token": `${token}`,
                },
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log("Response data: ", data);
            } else {
                console.log("Response data: ", data);
                throw new Error("Failed to fetch the file");
            }

            setLoading(false);
        } catch (err) {
            console.log("Error: ", err)
        }
    };



    return (
        <div>
            <h2>Check Access Token Validity</h2>
            <form onSubmit={handleCheckValidity}>
                <input
                    type="text"
                    placeholder="Enter access token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CheckTokenValidity;
