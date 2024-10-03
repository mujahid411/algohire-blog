import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
const AppContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState('');
    const base_url = "https://algohire-blog-server.vercel.app"
    // const base_url = 'http://localhost:5050'
    const navigate = useNavigate()

    useEffect(() => {
        async function authUser() {
            console.log("authUser")
            try {
                let token = localStorage.getItem('token')
                let response = await axios.get(`${base_url}/api/user/auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                    , {
                        withCredentials: true
                    })
                let details = response.data.payload.userDetails
                // let payload = details.payload;
                let userId = details._id;
                setUserId(details._id)
                let userResponse = await axios.get(`${base_url}/api/user/getUser`, {
                    params: {
                        id: userId
                    }
                }, {
                    withCredentials: true
                })
                let userDetails = userResponse.data
                setUser(userDetails)


            } catch (error) {
                console.error(error)
            }
        }
        authUser();
    }, [navigate])

    return (
        <GlobalContext.Provider value={{ user, setUser, userId, navigate, base_url }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;