import mongoose from 'mongoose';


class Database{
    constructor(){}
    
    async connectDB( URI ){
        try{
            const database = await mongoose.connect(URI)
            console.log('Database connected')
            console.log('Connected to DB!');
            console.log('Connection Host:', mongoose.connection.host);
            console.log('Connection Name (Database):', mongoose.connection.name);
            console.log('Cluster Info (Full URI):', mongoose.connection.client.s.url);

            return database
        }
        catch(error){
            console.log('An error occurred', error)
        }
    }

    closeDB(){
        mongoose.connection.close()
        console.log('Database disconected')
    }
}

export default Database