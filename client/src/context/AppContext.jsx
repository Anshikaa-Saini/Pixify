import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser]= useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [credit, setCredit] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits', {
                headers: {
                    token
                }
            });
            if(data.success) {
                setCredit(data.credits);     
                setUser(data.user);
            }
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken('')
        setUser(false);
        setCredit(false);
        toast.success("Logged out successfully")
    }

        useEffect (()=> {
            if(token) {
                loadCreditsData()
            }
        }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout
    }
    return (
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider