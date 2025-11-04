import connectDb from "../../config/database.js";
// this file will handle all the orders that will be made in urbantrends website

// creating an order
export const createOrder = async (req, res) => {
    try {
        const database = await connectDb();
        const { user_id, service_slug, tier_id, status } = req.body;

        if (!user_id || !service_slug || !tier_id || !status) {
            return res.status(400).json({message: "kindly enter all the fields"})
        };

        const [result] = await database.execute('INSERT INTO urbantrends_orders ( user_id, service_slug, tier_id, status ) VALUES ( ?, ?, ?, ? )', [ user_id, service_slug, tier_id, status ]);
        res.status(201).json({message: "order created successfully", result: result.insertId})
    } catch (error) {
        res.status(500).json({message :"internal server error", error: error.message})
    }
};

// get order by client details
export const getUsersOrder = async (req, res) => {
    try {
        const database = await connectDb();
        const { auth0_id } = req.params;

        const [rows] = await database.execute('SELECT * FROM urbantrends_orders WHERE user_id = ? ORDER BY created_at DESC', [ auth0_id ]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});
    }
}

