import Joi from 'joi'

    const schemaCreateCat = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    age: Joi.number()
        .integer()
        .min(0)
        .max(35).required(),

        isVaccinated:Joi.boolean().optional(),
        })
    const schemaUpdateCat = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .optional(),
    
        age: Joi.number()
            .integer()
            .min(0)
            .max(35).optional(),
    
            isVaccinated:Joi.boolean().optional(),
        }).or('name','age','isVaccinated')
        
        const validate=async(schema,obj,next)=>{
        try {
            await schema.validateAsync(obj)
            next()
        }
        catch (err) {
            next({
                status:400,
                message:err.message
            })
         }
        }

    export default {
        createCat:(req,res,next)=>{
            return validate(schemaCreateCat,req.body,next)
        },
        updateCat:(req,res,next)=>{
            return validate(schemaUpdateCat,req.body,next)
        }
    }