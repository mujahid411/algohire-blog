import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  let fetchBlog = async () => {
    try {
      let response = await axios.get('/api/blog/singleBlog', {
        params: {
          id
        }
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();    
  }, []); 

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {Object.keys(data).length > 0 && (
        <>
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

          <img src={data.imageUrl} alt="Blog Image" className="w-full h-auto mb-8 rounded-lg" />

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: data.blogContent }}
            />
            {data.blogContent}
        </>
      )}
    </div>
  );
};

export default SingleBlog;
