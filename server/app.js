import express from 'express';
import userRoutes from './controllers/users/index.js'
import blogRoutes from './controllers/blogs/index.js'
import dbConnect from './dbConnect.js';
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

app.post('/hi', (req, res) => {
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

app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)

app.listen(port, () => {
    console.log('Server is running at port', port);
})