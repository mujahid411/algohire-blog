import express from 'express';
import userRoutes from './controllers/users/index.js'
import blogRoutes from './controllers/blogs/index.js'
import dbConnect from './dbConnect.js';
import cors from 'cors'


dbConnect();

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
    }
));

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

app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)

app.listen(port, () => {
    console.log('Server is running at port', port);
})