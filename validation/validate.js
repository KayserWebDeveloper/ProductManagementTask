const Joi = require('@hapi/joi');
const boolean = require('@hapi/joi/lib/types/boolean');
const date = require('@hapi/joi/lib/types/date');
const authSchema = Joi.object({
    productName:Joi.string().min(2).max(30).required(),
    productCode:Joi.string().min(2).max(30).required(),
    dosageForm:Joi.string().min(2).max(30).required(),
    pakkingForm:Joi.string().min(2).max(30).required(),
    pakkinDisplay:Joi.string().min(2).max(30).required(),
    weight:Joi.number().required(),
    care:Joi.boolean().required(),
    salt:Joi.string().min(2).max(30).required(),
    saltGroup:Joi.string().min(2).max(30).required(),
    speciality:Joi.string().min(2).max(30).required(),
    manufacturer:Joi.string().min(2).max(30).required(),
    mrp:Joi.number().required(),
    priceToConsumer:Joi.number().required(),
    discountPercentage:Joi.number().required(),
    taxPercentage:Joi.number().required(),
    condition:Joi.string().min(2).max(30).required(),
    homepageCategory:Joi.string().min(2).max(30).required(),
    countryofOrigin:Joi.string().min(2).max(30).required(),
    strength:Joi.string().min(2).max(30).required(),
    stock:Joi.boolean().required(),
    prescriptionRequired:Joi.boolean().required(),
    pap:Joi.string().required(),
    PAPOffer:Joi.string().min(2).max(30).required(),
    abcd:Joi.string().min(2).max(30).required(),
    Title:Joi.string().min(2).max(30).required(),
    Keywords:Joi.string().min(2).max(30).required(),
    Description:Joi.string().min(2).max(30).required(),
})

module.exports={
    authSchema
}