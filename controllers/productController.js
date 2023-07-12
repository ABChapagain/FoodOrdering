import productModel from '../models/productModel.js'
import slugify from 'slugify';
import fs from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        // Validation
        switch (true) {
            case !name: return res.status(500).send({ error: 'name is required' })
            case !description: return res.status(500).send({ error: 'description is required' })
            case !price: return res.status(500).send({ error: 'price is required' })
            case !category: return res.status(500).send({ error: 'category is required' })
            case !quantity: return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 9000000: return res.status(500).send({ error: 'phot is required and should be less than 9mb' })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            message: "phot uploaded successfully",
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error is creating product"
        })
    }
}

//get all product
export const getProductController = async (req, res) => {
    try {

        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            message: 'getting products successfully',
            countTotal: products.length,
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error is getting product"
        })
    }
}

//get single products
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Single products Fetched",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting single products',
            error
        })
    }
}

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting photo',
            error
        })
    }
}
//delete Controller
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: ' deleting product Successfully',

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error
        })
    }
}

//updat product
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        // Validation
        switch (true) {
            case !name: return res.status(500).send({ error: 'name is required' })
            case !description: return res.status(500).send({ error: 'description is required' })
            case !price: return res.status(500).send({ error: 'price is required' })
            case !category: return res.status(500).send({ error: 'category is required' })
            case !quantity: return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 9000000: return res.status(500).send({ error: 'phot is required and should be less than 9mb' })
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            message: "product updated successfully",
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating product',
            error
        })
    }
}