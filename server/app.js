import express from 'express';
import userRoutes from './controllers/users/index.js'
import blogRoutes from './controllers/blogs/index.js'
import dbConnect from './dbConnect.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

dbConnect();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend's origin
    credentials: true
   }));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

// app.use(cors(
//         {
//         origin: "https://algohire-blog-client.vercel.app",
//         methods: ["POST", "GET","PUT","DELETE"],
//         credentials: true,
//     }
// ));
// app.use(cors({
//     origin: function(origin, callback){
//         // Define array of allowed origins
//         const allowedOrigins = ['http://localhost:3000', 'https://algohire-blog-client.vercel.app'];

//         // Allow requests with no origin 
//         // (like mobile apps or curl requests)
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.indexOf(origin) === -1){
//             var msg = 'The CORS policy for this site does not ' +
//                       'allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//             methods: ["POST", "GET","PUT","DELETE"],

// }));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
// app.use(cors({
//     origin: 'http://localhost:3000' 
// }));

const port = 5050;

app.use(express.json());
app.get('/', (req, res) => {
    try {
        res.send('server is up and running')
    } catch (error) {
        console.error(error)
    }
})



app.get('/allBlogs',async (req,res)=>{
    try {
        console.log('allblogs')
        return res.status(200).json({success:'blog created successfully!'})
    } catch (error) {
        console.error(error)
    }
})


app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)

app.listen(port, () => {
    console.log('Server is running at port', port);
})