import { useEffect, useRef, useState } from "react"
import Blog from "./Blog"
import axios from 'axios'


const MainPage = () => {

    const [state, setState] = useState(false)
    const [allBlogs,setAllBlogs]= useState([]);

    async function fetchBlogs(){
        try {
            let response = await axios.get('https://algohire-blog-blog.vercel.app/api/blog/allBlogs');
            setAllBlogs(response.data.blogs)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
fetchBlogs()
console.log(allBlogs)
    },[])
 
    const navigation = [
        { title: `+ Write blog`, path: "/writeblog" },
        { title: "My blogs", path: "/myblog" },
    ]

    const submenuNav = [
       
    ]


    return (
        <div>

        
        <header className="text-base lg:text-sm">
            <div className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${state ? "h-full fixed inset-x-0" : ""}`}>
                <div className="flex items-center justify-between py-3 lg:py-5 lg:block ">
                    <a href="javascript:void(0)" className="font-bold text-2xl">
                          Blog World
                    </a>
                    <div className="lg:hidden">
                        <button className="text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                    </svg>

                                )
                            }
                         </button>
                    </div>
                </div>
                <div className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? "" : "hidden"}`}>
                    <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
                        <form onSubmit={(e) => e.preventDefault()} className='flex-1 items-center justify-start pb-4 lg:flex lg:pb-0'>
                            {/* <div className="flex items-center gap-1 px-2 border rounded-lg"> */}
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg> */}
                                {/* <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
                                /> */}
                            {/* </div> */}
                        </form>
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx}>
                                        <a href={item.path} className="block  text-gray-700 hover:text-gray-900">
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <nav className="border-b">
                <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
                    {
                        submenuNav.map((item, idx) => {
                            return (
                                <li key={idx} className={`py-1 ${idx == 0 ? "border-b-2 border-indigo-600" : ""}`}>
                                    <a href={item.path} className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
  
          {allBlogs.length>0 && allBlogs.map((ele)=>{
            return <Blog key={ele._id} title={ele.title} imageUrl={ele.imageUrl} blogContent={ele.blogContent} id={ele._id}/>
          })}
        </div>
    )
}

export default MainPage