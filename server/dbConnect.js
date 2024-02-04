import mongoose from "mongoose";
import config from 'config'

async function dbConnect(){
    try {
        await mongoose.connect('mongodb+srv://mujahidahmed:Nanocollege$12@mujahidcluster.zk8lfcv.mongodb.net/algohire');
        // await mongoose.connect(config.get('DATABASE_URL'));
        console.log('Connected to Database');
    } catch (error) {
        console.error(error)
    }
}

export default dbConnect;
