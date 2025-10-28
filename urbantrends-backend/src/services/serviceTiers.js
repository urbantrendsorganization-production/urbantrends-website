import connectDb from "../../config/database.js";

// this file will handle business tiers for urbantrends

// adding tiers
export const addTiers = async (req, res) => {
    try {
        const database = await connectDb();
        const { showcase_slug, tier_name, price, description, features, delivery_time } = req.body;

        if (!showcase_slug || !tier_name || !price || !description) {
            return res.status(400).json({message: "kindly enter crucial fields"})
        }

        const [result] = await database.execute('INSERT INTO urbantrends_tiers ( showcase_slug, tier_name, price, description, features, delivery_time ) VALUES ( ?, ?, ?, ?, ?, ? )', [showcase_slug, tier_name, price, description, JSON.stringify(features), delivery_time]);
        res.status(201).json({message: 'tier added successfully', tier: result.insertId})

    } catch (error) {
        res.status(500).json({message: 'error adding tiers', error: error.message})
    }
};

// get all tiers;
export const getTiers = async (req, res) => {
    try {
        const database = await connectDb();

        const [rows] = await database.execute('SELECT * FROM urbantrends_tiers');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: "Error fetching tiers", error: error.message})
    }
}