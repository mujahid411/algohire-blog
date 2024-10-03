import { useEffect, useRef, useState } from "react"
import Blog from "./Blog"
import axios from 'axios'
import { useGlobalContext } from "../GlobalContext"
import NavBar from "./NavBar"

const MainPage = () => {

    const [state, setState] = useState(false)
    const [allBlogs, setAllBlogs] = useState([]);
    const { base_url } = useGlobalContext()

    async function fetchBlogs() {
        try {
            let response = await axios.get(`${base_url}/api/blog/allBlogs`, {
                withCredentials: true
            });
            let blogs = response.data.blogs
            blogs.reverse()
            setAllBlogs(blogs)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchBlogs()
    }, [])

    const navigation = [
        { title: `Write blog`, path: "/writeblog" },
        { title: "My blogs", path: "/myblog" },
        { title: "Logout", path: "/" },
    ]

    const submenuNav = []


    return (
        <div className="bg-gray-50">
            <NavBar />

            {allBlogs.length > 0 && allBlogs.map((ele) => {
                return <Blog key={ele._id} title={ele.title} imageUrl={ele.imageUrl} blogContent={ele.blogContent} id={ele._id} />
            })}
        </div>
    )
}

export default MainPage