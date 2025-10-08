"use client"; // This context will be used in client components
import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";


interface User {
    id?:string,
    username?: string;
    email?: string;
}

interface AuthContextType {
    userInfo: User | null;
    isLogin: boolean;
    setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [userInfo, setUserInfo] = useState<User | null>({
    id:"",
    username: "",
    email: ""
});
    const [isLogin, setIsLogin] = useState<boolean>(false)

    useEffect(() => {
        try{
             const checkUser = async () => {
            const res = await axios.get("/api/auth");
 
            setUserInfo(res?.data.user)
            setIsLogin(res?.data.isLoggedIn === true? true: false)
            // console.log( res.data)
        };
        checkUser();
        }catch(error){
            console.log('user data getting error',error)
        }
       
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, isLogin,setUserInfo,setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

