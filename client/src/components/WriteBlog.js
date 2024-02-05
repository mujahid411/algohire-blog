import React, { useRef, useState,useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WriteBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imageValue, setImageValue] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [blogContent, setBlogContent] = useState('');
    const navigate = useNavigate()

    const updateBlogContent = async () => {
        try {
            var tempDiv = document.createElement("div");
            tempDiv.innerHTML = content;
            setBlogContent(tempDiv.innerText);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        updateBlogContent();
    }, [content]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            await updateBlogContent();

            if (blogContent.length > 0 && imageUrl && title) {
                let response = await axios.post('https://algohire-blog-server.vercel.app/api/blog/createBlog', { blogContent, imageUrl, title }, {
                    withCredentials: true
                 });
                if (response) {
                    navigate('/main');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const uploadFile = async (type, data) => {
        try {
            let cloudName = 'drgqcwxq6';
            let resourceType = type === 'image' ? 'image' : 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;

            if (resourceType === 'image') {
                setImageValue(false);
                setImageUrl(secure_url);
            }

            return secure_url;
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (e) => {
        try {
            setImageValue(true);
            const newData = new FormData();
            newData.append('file', e.target.files[0]);
            newData.append('upload_preset', 'images_preset');

            setImage(e.target.files[0]);

            const imageUrl = await uploadFile('image', newData);
            console.log(imageUrl);
            setImageUrl(imageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick =async (e)=>{
        e.preventDefault()
        if(title.length<0){
            return;
        }
        // console.log(title)
        let response = await axios.get('/api/blog/ai-blog',{
            params: { title:title }
        });
        let newContent = response.data.blog
        setContent(newContent)
    }

    return (
        <div className="w-full relative z-10 text-gray-600 ">
            <center className="text-2xl font-bold mt-10">Create Blog</center>
            <div className="w-full mt-0 mx-auto p-8 bg-white max-w-full md:max-w-lg sm:px-0 sm:rounded-xl ">
                <form onSubmit={handleSubmit} className=" w-full space-y-3 mr-10 w-full">
                    <div>
                        <label className="font-medium">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-medium">Image</label>
                        <input
                            id="courseImage"
                            name="courseImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input w-full h-11 rounded border-1 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-black-600 text-sm mt-2 file:bg-black-600"
                            style={{ border: '1px solid grey', marginBottom: '0' }}
                        />
                    </div>
                    {imageUrl && <img src={imageUrl} className='w-full'/>}
                    <button
                    onClick={handleClick}
                        className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
                    >
                        Generate AI Blog
                    </button>

                    <div>
                        <label className="font-medium mb-2">Blog Content</label>
                        <div className="mt-2">
                            <JoditEditor ref={editor} value={content} onChange={newContent => setContent(newContent)} />
                            <div
                                dangerouslySetInnerHTML={{ __html: content }}
                                style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', display: 'none' }}
                            ></div>
                        </div>
                    </div>

                    <button
                    type='submit'
                        className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
                    >
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WriteBlog;
