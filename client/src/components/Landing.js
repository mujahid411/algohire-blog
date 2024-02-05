import { useState } from 'react'

const Landing =  () => {

    const [state, setState] = useState(false)

 
  
    return (
        <>
         <header>
                <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
                    <div className="flex justify-between items-center w-full">
                        <a href="#" className='font-bold text-2xl'>
                            Blog World
                        </a>
                        <button className="text-gray-500 outline-none md:hidden" onClick={() => setState(!state)}>
                            {state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                        <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${state ? '' : 'hidden'}`}>
                            <li className="order-2 pb-5 md:pb-0 ml-auto">
                                <a href="/login" className="py-3 px-6 rounded-md shadow-md text-white text-center bg-indigo-500 focus:shadow-none block md:inline">
                                    Sign In
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
                <div className="text-center space-y-4">
                    <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
                   Your Ideas, Our Magic.
                         <span className="text-indigo-600">  AI-Powered Blogs</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                    Empower Your Thoughts: Transform Ideas into Captivating Blogs with AI Assistance – Your Ultimate Blogging Companion                    </p>
                </div>
                <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                    <a href="/register" className="px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto">
                        Get started
                    </a>
                   
                </div>
            </section>
        </>
    )
}
export default Landing