import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
const AppContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        async function authUser() {
            try {
                let token = localStorage.getItem('token')
                console.log(token)
                let response = await axios.get('https://algohire-blog-server.vercel.app/api/user/auth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                , {
                    withCredentials: true
                 })
                console.log(response.data)
                let details = response.data.payload.userDetails
                // let payload = details.payload;
                let userId = details._id;
                setUserId(details._id)
                    let userResponse = await axios.get('https://algohire-blog-server.vercel.app/api/user/getUser', {
                        params: {
                            id: userId
                        }
                    }, {
                        withCredentials: true
                     })
                    let userDetails = userResponse.data
                    setUser(userDetails)
                    console.log(userDetails)

             
            } catch (error) {
                console.error(error)
            }
        }
        authUser();
    }, [navigate])

    return (
        <GlobalContext.Provider value={{ user, setUser, userId, navigate }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;