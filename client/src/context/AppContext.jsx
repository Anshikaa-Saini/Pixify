import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser]= useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [credit, setCredit] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate();

    useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken); // This triggers the next useEffect
  }
}, []);



    const loadCreditsData = async () => {
        try {
            const authToken = token || localStorage.getItem("token");
            const {data} = await axios.get(backendUrl + '/api/user/credits', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(data.success) {
                setCredit(data.credits);     
                setUser(data.user);
            }
            else {
            setCredit(null);
            setUser(null);
        }
        } 
        catch (error) {
            setCredit(null);
            setUser(null);
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {Authorization: `Bearer ${token}`}});
            loadCreditsData();
            if(data.success){
                return data.resultImage;
            } else {
                toast.error(data.message)
                // loadCreditsData();
                if(data.creditBalance === 0) {
                    navigate('/buy')
            }
            return null;
        }
        } catch (error) {
          toast.error(error.message)  
          loadCreditsData();
        return null;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken('')
        setUser(null);
        setCredit(null);
        toast.success("Logged out successfully")
    }

        // useEffect (()=> {
        //     if(token) {
        //         loadCreditsData()
        //     }
        // }, [token])

        useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken && !user) {
    setToken(storedToken); //  triggers the token effect
  }
}, []);

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }
    return (
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider