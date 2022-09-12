import { MongoClient } from 'mongodb'
import dotenv from 'dotenv/config'

const uriDB=process.env.MONGO_DB
const db = MongoClient.connect(uriDB)

process.on('SIGINT',async()=>{
    const client=await db
    client.close()
    console.log('Connection to DB terminated')
    process.exit(1)
})

export default db