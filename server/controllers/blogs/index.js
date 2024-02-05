import express from 'express'
import BlogModel from '../../models/BlogModel.js';
import OpenAI from "openai";
import dotenv from 'dotenv';


dotenv.config();


const router = express.Router()

router.post('/createBlog', async (req, res) => {
    try {
        let { title, blogContent, imageUrl } = req.body;
        console.log(req.body)

        let blogData = {
            title,
            imageUrl,
            blogContent
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
        console.log(find);
        res.send(find);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

})
const openAi = new OpenAI({
    apiKey:process.env.OPENAI_API,
  });
  

router.get("/ai-blog", async (req, res) => {
    try {
        const title  = req.query.title
        console.log(title)
        const result = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `write a blog on the ${title}, word count 100`,
                },
            ],
        });
        console.log(result.choices[0].message.content);
        let blog = result.choices[0].message.content

        return res.status(200).json({ success: 'ai blog generated successfully!', blog })

    } catch (error) {
        console.error(error);
    }
});

export default router