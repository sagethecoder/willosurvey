import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        });

        setUser(res.data);
        navigate("/survey");
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log("Login Failed:", error)
  });

  

  return (
    <div
      className="min-h-screen bg-cover bg-custom-image bg-center font-serif">
      <div className="flex flex-col min-h-screen bg-gray-400 bg-opacity-20">
        <header className="p-4">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-green-500">
              Willo
            </span>
            <span className="text-green-500">wood</span>
          </h1>
        </header>
        <div className="flex-grow flex items-center justify-center">
          <div className="w-[30rem] h-[13rem] flex flex-col items-center justify-center bg-gray-50 bg-opacity-30 rounded-xl shadow-md overflow-hidden p-8">
            <h2 className="text-3xl font-serif font-bold text-gray-50 mb-4">
              Please sign in to take the survey
            </h2>
            <button
              onClick={() => login()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
        <footer className="p-4 text-center text-white">
          <p className="text-2xl font-bold">Reliable Partners For A Healthy Harvest</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
