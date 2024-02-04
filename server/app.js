import express from 'express';
import userRoutes from './controllers/users/index.js'
import blogRoutes from './controllers/blogs/index.js'
import dbConnect from './dbConnect.js';
import UserModel from './models/UserModel.js';
import jwt from 'jsonwebtoken';
import BlogModel from './models/BlogModel.js';

import cors from 'cors'


dbConnect();
const app = express();

// app.use(cors(
    //     {
//         origin: ["http://localhost:3000/"],
//         methods: ["POST", "GET"],
//     }
// ));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
app.use(cors({
    origin: 'http://localhost:3000' 
}));

const port = 5050;

app.use(express.json());
app.get('/', (req, res) => {
    try {
        res.send('server is up and running')
    } catch (error) {
        console.error(error)
    }
})
app.get('/hello', (req, res) => {
    try {
        res.send('hello')
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/hi', (req, res) => {
    try {
        res.send('hi')
    } catch (error) {
        console.error(error)
    }
})

// app.get('*',(req,res,next)=>{
//     res.status(200).json({
//       message:'bad request'
//     })
//   })
app.get('/allBlogs',async (req,res)=>{
    try {
        
        return res.status(200).json({success:'blog created successfully!'})
        // let blogs = await BlogModel.find({});
    } catch (error) {
        console.error(error)
    }
})
app.post('/login', async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body
        // let findUser = await UserModel.findOne({ email });
        res.send(email,password);

        // if (!findUser) {
        //     return res.status(404).json({ error: 'Email not found,please register' })
        // }
        // if (findUser) {
        //     let payload = {
        //         email: req.body.email,
        //         role: findUser.role,
        //         userDetails: findUser
        //     }
        //     let privatekey = 'verify@123';
        //     let role = findUser.role;

        //     let token = jwt.sign(payload, privatekey, { expiresIn: '1d' });
        //     res.status(200).json({ success: 'User logged in successfully', token, role });
        // }
    } catch (error) {
        console.error(error)
    }
})

app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)

app.listen(port, () => {
    console.log('Server is running at port', port);
})