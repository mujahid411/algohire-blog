import { useState } from 'react'

const Landing = () => {

    const [state, setState] = useState(false)



    return (
        <>
            <header>

                <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
                    <div className="flex justify-between items-center w-full">
                        <a href="#" className='font-bold text-2xl'>
                            Blog World
                        </a>
                        <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${state ? '' : 'hidden'}`}>
                            <li className="order-2 pb-5 md:pb-0 ml-auto">
                                <a href="/login" className="py-3 px-6 rounded-md shadow-md text-center bg-indigo-500 focus:shadow-none block md:inline">
                                    Sign In
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
                <div className="text-center space-y-4">
                    <h1 className="font-bold text-4xl md:text-5xl">
                        Craft, Share, and
                        <span className="text-indigo-600">  Connect through Blogging.</span>
                    </h1>
                    <p className="max-w-xl mx-auto leading-relaxed">
                        Empower Your Thoughts: Transform Ideas into Captivating Blogs, Your Words, Your World                    </p>
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