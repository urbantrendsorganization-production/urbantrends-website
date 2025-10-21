import connectDb from "../../config/database.js";
// this file is going to have minimal services that will be used across the application and they will relate to every service upon order creation
// api for adding service in the frontend first

export const addMiniminalService = async (req, res) => {
    try {
        const database = await connectDb();
        const { title, service_image, description } = req.body;

        if (!title || !service_image || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [result] = await database.execute (
            'INSERT INTO urbantrends_showcase ( title, service_image, description) VALUES (?, ?, ?)',
            [title, service_image, description]
        )
        res.status(201).json({ message: 'Minimal service added successfully', serviceId: result.insertId });

    } catch (error) {
        console.error('Error adding minimal service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// getting all the added services
export const getMinimalServices = async (req, res) => {
    try {
        const database = await connectDb();

        const [rows] = await database.execute( 'SELECT * FROM urbantrends_showcase' );

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching minimal services:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// getting a single service by id
export const getMinimalServiceById = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;

        const [rows] = await database.execute(
            'SELECT * FROM urbantrends_showcase WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching minimal service by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// deleting a service by id
export const deleteMinimalService = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;

        const [result] = await database.execute(
            'DELETE FROM urbantrends_showcase WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting minimal service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};