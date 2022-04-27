const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:String,
    productCode:String,
    dosageForm:String,
    pakkingForm:String,
    pakkinDisplay:String,
    weight:Number,
    care:Boolean,
    salt:String,
    saltGroup:String,
    speciality:String,
    manufacturer:String,
    mrp:Number,
    priceToConsumer:Number,
    discountPercentage:Number,
    taxPercentage:Number,
    condition:String,
    homepageCategory:String,
    countryofOrigin:String,
    strength:String,
    stock:Boolean,
    prescriptionRequired:Boolean,
    pap:String,
    PAPOffer:String,
    abcd:String,
    Title:String,
    Keywords:String,
    Description:String
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;