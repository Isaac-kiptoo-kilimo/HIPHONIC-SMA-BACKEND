import Joi from 'joi';

export const eventValidator = (event) => {
    const eventValidatorSchema = Joi.object({
        // EventID: Joi.number().integer().min(1).required(),
        EventName: Joi.string().required(),
        Description: Joi.string().required(),
        EventDate: Joi.date().iso().required(),
        Location: Joi.string().required(),
        EventPosterURL: Joi.string().uri().required()
    });

    return eventValidatorSchema.validate(event);
};
