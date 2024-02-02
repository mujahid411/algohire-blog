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
        let {
            email,
            password
        } = req.body
        let findUser = await UserModel.findOne({ email });

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

router.post('/auth',(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})
export default router;

