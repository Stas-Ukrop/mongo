import db from './db.js'
import { ObjectId } from 'mongodb'

const readData=async(db,name)=>{
    const client =await db
    const collection=await client.db().collection(name)
    return collection
}

const getAll=async()=>{
    const collection=await readData(db,'cats25')
    const [result]=await collection.find({}).toArray()
    return result
}

const getById=async(id)=>{
    const collection=await readData(db,'cats25')
    const objId=new ObjectId(id)
    const results=await collection.find({_id:objId}).toArray()
    return results
}

const remove = async(id)=>{
    const collection=await readData(db,'cats25')
    const objId=new ObjectId(id)
    const result =await collection.findOneAndDelete({_id:objId})
        return result
}

const create = async(body)=>{
    const collection=await readData(db,'cats25')    
    const record ={
        ...body,
        ...(body.isVaccinated?{}:{isVaccinated:false})
    }
    const result = await collection.insertOne(record)
    return result
}

    const update=async(id,body)=>{
        const collection=await readData(db,'cats25')
        const objId=new ObjectId(id) 
        const result =await collection.findOneAndUpdate({_id:objId},{$set:body},{returnOriginal:true})
        return result
    }

export default {
    getAll,
    getById,
    remove,
    create,
    update
}