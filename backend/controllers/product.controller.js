import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log( "Error in get all products controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        console.log( "Error in get products by category controller", error.message);
        res.status(500).json({ message: error.message });
    }
}   

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featuredProducts");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" });
        }

        await redis.set("featuredProducts", JSON.stringify(featuredProducts));
        res.json(featuredProducts);
    } catch (error) {
        console.log( "Error in get featured products controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $match: { isFeatured: true } },
            { $sample: { size: 3 } },
            { $project: { _id: 1, name: 1, image: 1, price: 1, category: 1, description: 1 } }
        ]);
        res.json(products);
    } catch (error) {
        console.log( "Error in get recommended products controller", error.message);
        res.status(500).json({ message: error.message });
    }
}
export const createProduct = async (req, res) => {
    try {
        const { name, image, price, category, description } = req.body;
        let cloudinaryImage;
        if (image) {
            cloudinaryImage = await cloudinaryImage.uploader.upload(image, {
                folder: "products"
            });
        }
        const product = await Product.create({
            name,
            image: cloudinaryImage?.secure_url ? cloudinaryImage.secure_url : "",
            price,
            category,
            description
        });
        res.status(201).json(product);
    } catch (error) {
        console.log( "Error in create product controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const toggleFeatureProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.isFeatured = !product.isFeatured;
        await product.save();
        await updateFeaturedProductsCache();
        res.status(200).json(product, { message: "Product updated successfully" });
    } catch (error) {
        console.log( "Error in toggle feature product controller", error.message);
        res.status(500).json({ error: error.message });
    }   
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.isFeatured) {
            updateFeaturedProductsCache()
        }

       if (product.image) {
        const publicId = product.image.split("/").pop().split(".")[0];
        try {
            await cloudinary.uploader.destroy(publicId);
            console.log("Image deleted from Cloudinary");
        } catch (error) {
            console.log( "Error deleting image from cloudinary", error.message);
            res.status(500).json({ message: error.message });
        }
       }

       await Product.findByIdAndDelete(req.params.id);
       res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log( "Error in delete product controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

async function updateFeaturedProductsCache() {
    try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log( "Error in update featured products cache controller", error.message);
    }
}
