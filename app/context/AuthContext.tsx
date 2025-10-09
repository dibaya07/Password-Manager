"use client"; // This context will be used in client components
import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";


interface User {
    id?: string,
    username?: string;
    email?: string;
}
export interface Details {
    title?: string;
    username?: string;
    password?: string;
    url?: string;
    notes?: string;
}

interface AuthContextType {
    userInfo: User | null;
    isLogin: boolean;
    setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    passwordDetails: Details | null;
    setPasswordDetails: React.Dispatch<React.SetStateAction<Details | null>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [passwordDetails, setPasswordDetails] = useState<Details | null>(null)

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get("/api/auth");

                setUserInfo(res?.data.user)
                setIsLogin(res?.data.isLoggedIn === true ? true : false)
            } catch (error) {
                console.log('user data getting error', error)
                setUserInfo(null);
                setIsLogin(false);
            }

        };
        checkUser();

    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, isLogin, setUserInfo, setIsLogin, passwordDetails, setPasswordDetails }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

