import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {Toaster, toast} from 'react-hot-toast'
const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    //login user
    async function loginUser(email, password, navigate) {
        try {
            const {data} = await axios.post("http://localhost:5000/api/user/login", {email, password});
            toast.success(data.message);
            localStorage.setItem("token", data.accessToken);
            setUser(data.user);
            setIsAuth(true);
            navigate("/account");
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.error);
            setIsAuth(false);
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
    
    return <UserContext.Provider value={{user, setUser, isAuth, setIsAuth, loginUser}}>
        {children}
        <Toaster/>
    </UserContext.Provider>
}

export const UserData = () => useContext(UserContext)