import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import Toast from "./Toast";

const Register= () => {
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      name: '',
      email: '',
      password:''
    });
    let handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
    }


  
    let handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user)
     try {
       let response = await axios.post('https://algohire-blog.vercel.app/api/user/register',{
        ...user
       },{
            withCredentials: true, // Include credentials (cookies) in the request
       })
      if(response.status===200){
        navigate('/login')
      }

    //    let role = response.data.role;
     } catch (error) {
        console.error(error)
        // showToast("Something went wrong!");

     }
    }



    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
            <div className="text-center">
                <div className="mt-5 space-y-2">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                    <p className="">Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-black-500">Log in</a></p>
                </div>
            </div>
            <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"

                >
                    <div>
                        <label className="font-medium" htmlFor='name'>
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={user.name}
                            name='name'
                            id='name'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="font-medium" htmlFor='email'>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={user.email}
                            name='email'
                            id='email'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="font-medium" htmlFor='password'>
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={user.password}
                            name='password'
                            id='password'
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Create account
                    </button>
                </form>
            </div>
        </div>
    </main>

    )
}

export default Register