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
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    generatedPassword: string;
    setGeneratedPassword: React.Dispatch<React.SetStateAction<string>>;
    isGenerated: boolean;
    setIsGenerated: React.Dispatch<React.SetStateAction<boolean>>
    isACAvailable: boolean;
    setIsACAvailable: React.Dispatch<React.SetStateAction<boolean>>
    accessCodeSetter: boolean;
    setaccessCodeSetter: React.Dispatch<React.SetStateAction<boolean>>
    accessCode: string;
    setAccessCode: React.Dispatch<React.SetStateAction<string>>

}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [passwordDetails, setPasswordDetails] = useState<Details | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [generatedPassword, setGeneratedPassword] = useState<string>("")
    const [isGenerated, setIsGenerated] = useState<boolean>(false)
    const [isACAvailable, setIsACAvailable] = useState<boolean>(false)
    const [accessCode, setAccessCode] = useState<string>("")
    const [accessCodeSetter, setaccessCodeSetter] = useState<boolean>(false)

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

    }, [isLogin]);

    return (
        <AuthContext.Provider value={{ userInfo, isLogin, setUserInfo, setIsLogin, passwordDetails, setPasswordDetails, showForm, setShowForm, generatedPassword, setGeneratedPassword, isGenerated, setIsGenerated, isACAvailable, setIsACAvailable, accessCode, setAccessCode, accessCodeSetter, setaccessCodeSetter }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

