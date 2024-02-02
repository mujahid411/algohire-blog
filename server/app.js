import express from 'express';
import userRoutes from './controllers/users/index.js'
import blogRoutes from './controllers/blogs/index.js'
import dbConnect from './dbConnect.js';

dbConnect();

const app = express();

const port = 5050;

app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.send('server is up and running')
    } catch (error) {
        console.error(error)
    }
})

app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)

app.listen(port, () => {
    console.log('Server is running at port', port);
})