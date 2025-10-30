import connectDb from "../../config/database.js";
// this file is going to handle the selling of urbantrends products.
// first it will be showcasing then the buying or subscription flow

export const addProducts = async (req, res) => {
    try {
        const database = await connectDb();
        const { product_name, slug_name, product_image, description } = req.body;

        if (!product_name || !slug_name || !product_image ) {
            return res.status(400).json({message: "Kindly fill all the crucial fields"})
        }

        const [result] = await database.execute('INSERT INTO urbantrends_products ( product_name, slug_name, product_image, description ) VALUES ( ?, ?, ?, ? )', [product_name, slug_name, product_image, description]);
        res.status(201).json({message: 'Product added successfully', id: result.insertId});

    } catch (error) {
        res.status(500).json({message: 'internal server error. failed to add product', error: error.message})
    }
}

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const database = await connectDb();

        const [rows] = await database.execute('SELECT * FROM urbantrends_products')
        if (rows.affectedRows === 0) {
            return res.status(400).json({message: 'products not found'})
        };
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error.message});
    }
}

// get products by id
export const getProductsById = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;

        const [rows] = await database.execute('SELECT * FROM urbantrends_products WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(400).json({message: 'service not found'})
        };

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: 'internal server error', error: error.message});
    }
}

