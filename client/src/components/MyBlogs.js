import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../GlobalContext'
import axios from 'axios'
import { FaArrowLeft } from 'react-icons/fa';

const MyBlogs = () => {
    let { userId,navigate } = useGlobalContext();
    let id = userId
    const [blogs, setBlogs] = useState([])

    const getMyBlogs = async () => {
        try {
            let response = await axios.get('https://algohire-blog-server.vercel.app/api/user/myBlogs', {
                params: {
                    id
                }
            } , {
                withCredentials: true
             })
            let allBlogs = response.data;
            console.log(allBlogs)
            setBlogs(allBlogs)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (blogs.length === 0) {
            getMyBlogs()
        }
    }, [blogs])

    const handleDelete = async (blogId) => {
        try {
            await axios.delete(`https://algohire-blog-server.vercel.app/api/blog/deleteBlog/${blogId}` , {
                withCredentials: true
             });
            // After successful deletion, fetch updated list of blogs
            getMyBlogs();
        } catch (error) {
            console.error(error);
        }
    }
    if(blogs.length===0){
        return (
            <div>
                <button
                className="absolute top-3 left-3 p-3 rounded-full bg-gray-200 hover:bg-gray-300 z-50"
                onClick={() => navigate('/main')}
            >
                <FaArrowLeft />
            </button>
            <div className="w-full flex justify-center">
            <h1 className='text-4xl font-bold mt-20'>No Blogs Yet...</h1>
        </div>
            </div>
        
        )
            
    }

    return (
        <div>
            <button
                className="absolute top-3 left-3 p-3 rounded-full bg-gray-200 hover:bg-gray-300 z-50"
                onClick={() => navigate('/main')}
            >
                <FaArrowLeft />
            </button>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="items-start justify-between md:flex">

                </div>
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Title</th>

                                <th className="py-3 px-6"></th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {blogs.length > 0 &&
                                blogs.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>

                                        <td className="text-right px-6 whitespace-nowrap">
                                            <a href={`/singleblog/${item._id}`} className="py-2 px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                View
                                            </a>
                                            <a href={`/editblog/${item._id}`} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Edit
                                            </a>
                                            <button onClick={() => handleDelete(item._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">Delete</button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default MyBlogs