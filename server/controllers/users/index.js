import express from 'express'
import jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel.js';
const router = express.Router()


router.post('/register', async (req, res) => {
    try {
        let { name, email, password } = req.body
        console.log(req.body)

        let findUser = await UserModel.findOne({ email })
        if (findUser) {
            res.status(400).json({ error: 'email already exists please login!!' })
        }

        let userData = {
            name,
            email,
            password,
            role: 'user',
            // comments:[]
        }
        console.log(userData)
        let userDetails = new UserModel(userData)
        await userDetails.save()
        res.status(200).json({ success: 'user registered successfully!' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })

    }
})

router.post('/login', async (req, res) => {
    try {
        console.log('hello')
        let {
            email,
            password
        } = req.body
        console.log(email)
        let findUser = await UserModel.findOne({ email });
         console.log(findUser)
        if (!findUser) {
            return res.status(404).json({ error: 'Email not found,please register' })
        }
        if (findUser) {
            let payload = {
                email: req.body.email,
                role: findUser.role,
                userDetails: findUser
            }
            let privatekey = 'verify@123';
            let role = findUser.role;

            let token = jwt.sign(payload, privatekey, { expiresIn: '1d' });
            res.status(200).json({ success: 'User logged in successfully', token, role });
        }
    } catch (error) {
        console.error(error)
    }
})

router.get('/auth', (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Token not provided' });
        }

        const token = authorizationHeader.split(' ')[1];

        const decodedToken = jwt.verify(token, 'verify@123');

        return res.status(200).json({ message: 'Authorization Successful', payload: decodedToken });
    } catch (error) {
        console.error(error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please log in again' });
        }

        return res.status(401).json({ error: 'Invalid token, please log in again' });
    }
});


router.get('/getUser' , async(req,res)=>{
    try {
          console.log('user')
            let id = req.query.id;
            console.log(id)
            let find = await UserModel.findById(id);
            console.log(find)
             if(find){
               res.send(find);
             }
           
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
        
    }
})
export default router;

