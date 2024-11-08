import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {Toaster, toast} from 'react-hot-toast'
const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    //login user
    async function loginUser(email, password, navigate, getMyCourse) {
        try {
            const {data} = await axios.post("http://localhost:5000/api/user/login", {email, password});
            toast.success(data.message);
            localStorage.setItem("token", data.accessToken);
            setUser(data.user);
            setIsAuth(true);
            navigate("/account");
            getMyCourse();
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.error);
            setIsAuth(false);
        }
    }


    async function registerUser(name,email, password, navigate) {
        try {
            const {data} = await axios.post("http://localhost:5000/api/user/register", {name, email, password});
            toast.success(data.message);
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/verify");
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.error);
        }
    }



    async function verifyUser(otp, navigate) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const {data} = await axios.post("http://localhost:5000/api/user/verify", {otp, accessToken});
            toast.success(data.message);
            navigate("/login");
            localStorage.clear();
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.error);
        }
    }


    //user profile
    async function userProfile() {
        try {
            const {data} = await axios.get("http://localhost:5000/api/user/profile",{headers:{
                token: localStorage.getItem("token"),
            }});
            setIsAuth(true); 
            setUser(data.user);
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        userProfile();
    }, [])
    
    return <UserContext.Provider value={{user, setUser, isAuth, setIsAuth, loginUser, registerUser,verifyUser , userProfile}}>
        {children}
        <Toaster/>
    </UserContext.Provider>
}

export const UserData = () => useContext(UserContext)