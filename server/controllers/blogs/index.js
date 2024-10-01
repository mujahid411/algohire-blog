import express from 'express'
import BlogModel from '../../models/BlogModel.js';
import OpenAI from "openai";
import dotenv from 'dotenv';


dotenv.config();


const router = express.Router()

router.post('/createBlog', async (req, res) => {
    try {
        let { title, blogContent, imageUrl, userId, userName } = req.body;
        console.log(req.body)

        let blogData = {
            title,
            imageUrl,
            blogContent,
            userId,
            userName
        }
        let blogDetails = new BlogModel(blogData);
        await blogDetails.save()


        return res.status(200).json({ success: 'blog created successfully!' })

    } catch (error) {
        console.error(error)
    }
})

router.get('/allBlogs', async (req, res) => {
    try {
        let blogs = await BlogModel.find({});
        return res.status(200).json({ success: 'blog created successfully!', blogs })

    } catch (error) {
        console.error(error)
    }
})

router.get('/singleBlog', async (req, res) => {
    try {
        let { id } = req.query;
        let find = await BlogModel.findOne({ _id: id });
        res.send(find);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

})
// const openAi = new OpenAI({
//     apiKey: process.env.OPENAI_API,
// });


// router.get("/ai-blog", async (req, res) => {
//     try {
//         const title = req.query.title
//         console.log(title)
//         const result = await openAi.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 {
//                     role: "user",
//                     blogContent: `write a blog on the ${title}, word count 100`,
//                 },
//             ],
//         });
//         console.log(result.choices[0].message.blogContent);
//         let blog = result.choices[0].message.blogContent

//         return res.status(200).json({ success: 'ai blog generated successfully!', blog })

//     } catch (error) {
//         console.error(error);
//     }
// });

router.put("/updateBlog/:id", async (req, res) => {
    try {
        const { title, blogContent, imageUrl } = req.body;
        const { id } = req.params;

        if (!title || !blogContent || !imageUrl) {
            return res.status(400).json({ message: "Title, blogContent, and image are required" });
        }

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            { title, blogContent, imageUrl },
            { new: true }
        );

        res.json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/deleteBlog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await BlogModel.findByIdAndDelete(id);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/likeBlog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);
        blog.likes += 1;
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/removelikeBlog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);
        blog.likes -= 1;
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/commentBlog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const blog = await BlogModel.findById(id);
        blog.comments.push(comment);
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router