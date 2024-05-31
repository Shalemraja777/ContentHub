import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-tz54972-shard-00-00.ta9g9bn.mongodb.net:27017,ac-tz54972-shard-00-01.ta9g9bn.mongodb.net:27017,ac-tz54972-shard-00-02.ta9g9bn.mongodb.net:27017/?ssl=true&replicaSet=atlas-4jt23a-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;
