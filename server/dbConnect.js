import mongoose from "mongoose";

async function dbConnect(){
    try {
        await mongoose.connect('mongodb+srv://mujahidahmed:Nanocollege$12@mujahidcluster.zk8lfcv.mongodb.net/algohire');
        console.log('Connected to Database');
    } catch (error) {
        console.error(error)
    }
}

export default dbConnect;
