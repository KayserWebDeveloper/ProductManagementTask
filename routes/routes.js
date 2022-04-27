const router = require('express').Router();
const upload = require("../controller/upload.js");
const {mainRoute,  insertProduct, allData, updateData, uploadData, deleteData, findProduct, download} = require("../controller/controller")

router.get("/", mainRoute);

router.post("/productManagement", insertProduct);

router.get("/productManagement", allData);

router.get('/products/download', download);

router.post('/products/upload', upload.single("file"), uploadData);

router.delete('/products/:productId', deleteData);

router.get('/products/:_id', findProduct);

router.put("/updateProduct", updateData);

module.exports = router;