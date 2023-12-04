import mongoose from 'mongoose';




class Database{
    constructor(){}
    
    async connectDB( URI ){
        try{
            const database = await mongoose.connect(URI)
            console.log('Database connected')
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