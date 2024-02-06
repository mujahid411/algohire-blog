import React from 'react'

const Blog = ({title,blogContent,imageUrl,id}) => {
 return (
    <section className="py-14">
    <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-10 sm:px-0 md:px-0 lg:flex">
            <div className="flex-1 sm:w-1/2 px-3 md:pl-16">
                <img src={imageUrl} className="md:max-w-lg sm:rounded-lg " alt="" style={{width:'400px'}} />
            </div>
            <div className="max-w-xl px-3 space-y-3 mt-0 sm:px-0 md:mt-0 lg:max-w-2xl">
                
                <p className="text-gray-800 text-3xl font-semibold sm:text-4xl text-left">
                   {title}
                </p>
                <p className="mt-3 text-gray-600 text-left">
  {blogContent.length > 150 ? `${blogContent.substring(0, 200)}...` : blogContent}
</p>

                <a href={`/singleBlog/${id}`} className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section> )
}

export default Blog
