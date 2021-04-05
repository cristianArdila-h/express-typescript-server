import mongoose from "mongoose";
import { MONGODB_CNN } from "../utils/variables";


export class DbConnection {

    constructor() {
    }
    upConect = async () => {
        try {
            await mongoose.connect( MONGODB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });

            console.log('Bd online');
        } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de iniciar la Base de datos.');
        }
    }
}
const dbConnection = new DbConnection();
export default dbConnection;
