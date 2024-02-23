
import joi from 'joi'

export const userRegistrationValidation=(user)=>{
const userRegistrationSchema=joi.object({
    Username:joi.string().required(),
    Email:joi.string().email().required(),
    Password:joi.string().required(),
    Location:joi.string().required(),
    TagName:joi.string().required(),
})
return userRegistrationSchema.validate(user)
}
