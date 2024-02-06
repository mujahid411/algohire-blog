import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaComment, FaShare, FaArrowLeft } from 'react-icons/fa'; // Import icons from React Icons
import { useGlobalContext } from '../GlobalContext';

const SingleBlog = () => {
    const { id } = useParams();
    const { userId, user,navigate } = useGlobalContext();
    let username = user.name
    const [data, setData] = useState({});
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [newLiked, setNewLiked] = useState(0);
    const [authorName, setAuthorName] = useState('');

    let fetchBlog = async () => {
        try {
            let response = await axios.get('https://algohire-blog-server.vercel.app/api/blog/singleBlog', {
                params: { id },
                withCredentials: true
            });
            setData(response.data);
            setLikes(response.data.likes || 0);
            setComments(response.data.comments || []);
            setAuthorName(response.data.userName || 'john bradman');
            const userLiked = localStorage.getItem(`liked-${id}`);
            setLiked(userLiked === "true");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    const handleLike = async () => {
        try {
            if (!liked) {
                setLikes(likes + 1);
                setNewLiked(newLiked + 1);
                setLiked(true);
                localStorage.setItem(`liked-${id}-${userId}`, "true");
                await axios.post(`https://algohire-blog-server.vercel.app/api/blog/likeBlog/${id}` , {
                    withCredentials: true
                 });
            } else {
                if (newLiked > 0) setLikes(likes - 1);
                setLiked(false);
                setNewLiked(0)
                localStorage.removeItem(`liked-${id}-${userId}`);
                await axios.post(`https://algohire-blog-server.vercel.app/api/blog/removelikeBlog/${id}` , {
                    withCredentials: true
                 });

            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleComment = async () => {
        if (newComment.trim() !== "") {
            setComments([...comments, newComment]);
            await axios.post(`https://algohire-blog-server.vercel.app/api/blog/commentBlog/${id}`, { comment: newComment }
            , {
                withCredentials: true
             });
            setNewComment("");
        }
    };

    const handleShare = () => {
        const blogUrl = window.location.href;
        if (navigator.share) {
            navigator
                .share({
                    title: "Check out this blog!",
                    text: "Interesting content here",
                    url: blogUrl,
                })
                .then(() => console.log("Shared successfully"))
                .catch((error) => console.error("Error sharing:", error));
        } else {
            alert("Web Share API is not supported on your device/browser.");
        }
    };

    return (
        <div>
            <button
                className="absolute top-3 left-3 p-3 rounded-full bg-gray-200 hover:bg-gray-300 z-50"
                onClick={() => navigate('/main')}
            >
                <FaArrowLeft />
            </button>

            <div className="max-w-screen-lg mx-auto p-4">

                {Object.keys(data).length > 0 && (
                    <>

                        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
                        <p className='text-xl mb-2'>By {authorName}</p>
                        <img src={data.imageUrl} alt="Blog Image" className="w-full h-auto mb-8 rounded-lg" />
                        <div className="flex items-center space-x-4 pb-2 pl-1 ">
                            <button onClick={handleLike} className="flex items-center text-gray-500 hover:text-gray-800">
                                <FaThumbsUp className="mr-1" />
                                Like ({likes})
                            </button>
                            {/* <button onClick={handleComment} className="flex items-center text-gray-500 hover:text-gray-800">
              <FaComment className="mr-1" />
              Comment
            </button> */}
                            <button onClick={handleShare} className="flex items-center text-gray-500 hover:text-gray-800">
                                <FaShare className="mr-1" />
                                Share
                            </button>
                        </div>

                        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: data.blogContent }} />

                        <hr className="my-4 " />


                        <div className="mt-4">
                            <input
                                id="commentInput"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="border border-gray-300 p-2 w-full rounded"
                            />
                            <button onClick={handleComment} className="mt-2 bg-black text-white p-2 rounded">
                                Comment
                            </button>
                        </div>

                        <ul className="mt-4">
                            {comments.map((comment, index) => (
                                <div>

                                    <hr className="my-4 " />
                                    {/* <span className='font-bold'>{username}</span> */}
                                    <li key={index} className="mb-2">
                                        {comment}
                                    </li>

                                </div>

                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default SingleBlog;
