const router = require('express').Router();
const { authSchema } = require('../validation/validate');
const Product = require('../databases/schema/schema');
const fs = require("fs");
const stream = require("stream");
const excel = require("exceljs");
const readXlsxFile = require("read-excel-file/node");
const convertToJSON = require("./conXlToJson");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.mainRoute = (req, res) => {
    res.send("Hello World!");
}

exports.insertProduct = async (req, res) => {
    try {
        const result = await authSchema.validateAsync(req.body);

        Product.findById(req.body.productName, (err, data) => {
            if (!data) {
                const product = new Product({
                    productName: req.body.productName,
                    productCode: req.body.productCode,
                    dosageForm: req.body.dossageForm,
                    pakkingForm: req.body.pakkingForm,
                    pakkinDisplay: req.body.pakkinDisplay,
                    weight: req.body.weight,
                    care: req.body.care,
                    salt: req.body.salt,
                    saltGroup: req.body.saltGroup,
                    speciality: req.body.speciality,
                    manufacturer: req.body.manufacturer,
                    mrp: req.body.mrp,
                    priceToConsumer: req.body.priceToConsumer,
                    discountPercentage: req.body.discountPercentage,
                    taxPercentage: req.body.taxPercentage,
                    condition: req.body.condition,
                    homepageCategory: req.body.homepageCategory,
                    countryofOrigin: req.body.countryofOrigin,
                    strength: req.body.strength,
                    stock: req.body.stock,
                    prescriptionRequired: req.body.prescriptionRequired,
                    pap: req.body.pap,
                    PAPOffer: req.body.PAPOffer,
                    abcd: req.body.abcd,
                    Title: req.body.Title,
                    Keywords: req.body.Keywords,
                    Description: req.body.Description
                });
                product.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Error during inserting"
                        });
                    });

            }
        })
    } catch (error) {
        res.status(409).json({ message: error?.message || error })
    }
};



exports.allData = (req, res) => {
    Product.find({}).sort({ _id: -1 })
        .then(product => {
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving product details."
            });
        });
};

exports.updateData = (req, res) => {
    if (!req.body.productName) {
        return res.status(400).send({
            message: "product Name can not be empty"
        });
    }


    Product.findByIdAndUpdate(req.params.productId, {
        productName: req.body.productName,
        productCode: req.body.productCode,
        dosageForm: req.body.dossageForm,
        pakkingForm: req.body.pakkingForm,
        pakkinDisplay: req.body.pakkinDisplay,
        weight: req.body.weight,
        care: req.body.care,
        salt: req.body.salt,
        saltGroup: req.body.saltGroup,
        speciality: req.body.speciality,
        manufacturer: req.body.manufacturer,
        mrp: req.body.mrp,
        priceToConsumer: req.body.priceToConsumer,
        discountPercentage: req.body.discountPercentage,
        taxPercentage: req.body.taxPercentage,
        condition: req.body.condition,
        homepageCategory: req.body.homepageCategory,
        countryofOrigin: req.body.countryofOrigin,
        strength: req.body.strength,
        stock: req.body.stock,
        prescriptionRequired: req.body.prescriptionRequired,
        pap: req.body.pap,
        PAPOffer: req.body.PAPOffer,
        abcd: req.body.abcd,
        Title: req.body.Title,
        Keywords: req.body.Keywords,
        Description: req.body.Description,
    }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Coupon not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.productId
            });
        });
};

exports.download = (req, res) => {
    try {
        Product.find({}).then((objs) => {
            let tutorials = [];
            console.log(objs)
            objs.forEach((obj) => {
                tutorials.push({
                    productName: obj.productName,
                    productCode: obj.productCode,
                    dosageForm: obj.dossageForm,
                    pakkingForm: obj.pakkingForm,
                    pakkinDisplay: obj.pakkinDisplay,
                    weight: obj.weight,
                    care: obj.care,
                    salt: obj.salt,
                    saltGroup: obj.saltGroup,
                    speciality: obj.speciality,
                    manufacturer: obj.manufacturer,
                    mrp: obj.mrp,
                    priceToConsumer: obj.priceToConsumer,
                    discountPercentage: obj.discountPercentage,
                    taxPercentage: obj.taxPercentage,
                    condition: obj.condition,
                    homepageCategory: obj.homepageCategory,
                    countryofOrigin: obj.countryofOrigin,
                    strength: obj.strength,
                    stock: obj.stock,
                    prescriptionRequired: obj.prescriptionRequired,
                    pap: obj.pap,
                    PAPOffer: obj.PAPOffer,
                    abcd: obj.abcd,
                    Title: obj.Title,
                    Keywords: obj.Keywords,
                    Description: obj.Description,
                });

            });
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("Product");
            console.log("tutorial", tutorials);
            worksheet.columns = [
                { header: "productName", key: "productName", width: 25 },
                { header: "productCode", key: "productCode", width: 25 },
                { header: "dosageForm", key: "dosageForm", width: 25 },
                { header: "pakkingForm", key: "pakkingForm", width: 25 },
                { header: "pakkinDisplay", key: "pakkinDisplay", width: 25 },
                { header: "weight", key: "weight", width: 25 },
                { header: "care", key: "care", width: 25 },
                { header: "salt", key: "salt", width: 25 },
                { header: "saltGroup", key: "saltGroup", width: 25 },
                { header: "speciality", key: "speciality", width: 25 },
                { header: "manufacturer", key: "manufacturer", width: 25 },
                { header: "mrp", key: "mrp", width: 25 },
                { header: "priceToConsumer", key: "priceToConsumer", width: 25 },
                { header: "discountPercentage", key: "discountPercentage", width: 25 },
                { header: "taxPercentage", key: "taxPercentage", width: 25 },
                { header: "condition", key: "condition", width: 25 },
                { header: "homepageCategory", key: "homepageCategory", width: 25 },
                { header: "countryofOrigin", key: "countryofOrigin", width: 25 },
                { header: "strength", key: "strength", width: 25 },
                { header: "stock", key: "stock", width: 25 },
                { header: "prescriptionRequired", key: "prescriptionRequired", width: 25 },
                { header: "pap", key: "pap", width: 25 },
                { header: "PAPOffer", key: "PAPOffer", width: 25 },
                { header: "abcd", key: "abcd", width: 25 },
                { header: "Title", key: "Title", width: 25 },
                { header: "Keywords", key: "Keywords", width: 25 },
                { header: "Description", key: "Description", width: 25 },

            ];
            // Add Array Rows
            worksheet.addRows(tutorials);
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "tutorials.xlsx"
            );



            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();

            });

        });

    } catch (error) {
        res.send(error);
    }
};

exports.uploadData = (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path = __dirname + "/uploads/" + req.file.filename;
        readXlsxFile(path).then((values) => {
            const data = JSON.stringify(convertToJSON(values));
            console.log(data);
            var myObj = JSON.parse(data)

            const options = { new: true };
            Product.insertMany(myObj, options)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded successfully: " + req.file.originalname,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!", error
                    });
                });

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

exports.deleteData = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            res.send({ message: "product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};

exports.findProduct = (req, res) => {
    Product.findById(req.params._id)
        .then(product => {
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving product details."
            });
        });
};