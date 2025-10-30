import connectDb from "../../config/database.js";
// this file will handle urbantrends_products_tiers

export const addProductTiers = async (req, res) => {
    try {
        const database = await connectDb();
        const { products_slug, tier_name, price, description, features, delivery_time } = req.body;

        if (!products_slug || !tier_name || !price || !description) {
            return res.status(400).json({message: "All products tiers page not complete"})
        };

        const [result] = await database.execute('INSERT INTO urbantrends_products_tiers ( products_slug, tier_name, price, description, features, delivery_time ) VALUES ( ?, ?, ?, ?, ?, ? )', [ products_slug, tier_name, price, description, JSON.stringify(features), delivery_time ]);

        res.status(201).json({message: 'Product added successfully', response: result.insertId});
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message})
    }
};

// get all tiers
export const getAllTiers = async (req, res) => {
    try {
        const database = await connectDb();

        const [rows] = await database.execute('SELECT * FROM urbantrends_products_tiers');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: 'internal server error', error: error.message});
    }
};

// get tiers by slug_name
export const getTierBySlug = async (req, res) => {
    try {
        const database = await connectDb();
        const { products_slug } = req.params;

        const [rows] = await database.execute(`SELECT * FROM urbantrends_products_tiers WHERE products_slug = ?`, [products_slug] );

        if (rows.affectedRows === 0) {
            return res.status(400).json({message: `The product with this ${products_slug} is not found`});
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: 'internal server error', error: error.message});
    }
}