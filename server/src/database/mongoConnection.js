import momgoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connect;