import connectDb from "../../config/database.js";
// this file is going to have minimal services that will be used across the application and they will relate to every service upon order creation
// api for adding service in the frontend first
// also as an entry point to order stage and account creation

export const addMiniminalService = async (req, res) => {
    try {
        const database = await connectDb();
        const { title, service_image, description, slug } = req.body;

        if (!title || !service_image || !description || !slug) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [result] = await database.execute (
            'INSERT INTO urbantrends_showcase ( title, service_image, description, slug) VALUES (?, ?, ?, ?)',
            [title, service_image, description, slug]
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
};


// update service by id
export const updateServiceById = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;
        const { title, service_image, description, slug, category_id } = req.body;

        // ensure data in updated fields
        if (!title || !description || !slug) {
            return res.status(400).json({message: 'Kindly fill in the updating fields'})
        }

        // Build dynamic query based on provided fields
        const fields = [];
        const values = [];

        if (title) { fields.push("title = ?"); values.push(title); }
        if (description) { fields.push("description = ?"); values.push(description); }
        if (service_image) { fields.push("service_image = ?"); values.push(service_image); }
        if (slug) { fields.push("slug = ?"); values.push(slug); }
        if (category_id) { fields.push("category_id = ?"); values.push(category_id); }

        values.push(id);

        // update services
        const [result] = await database.execute(
            `UPDATE urbantrends_showcase SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            values
        )

        if (result.affectedRows === 0) {
            return res.status(500).json({message: 'Service not found'})
        }

        res.status(200).json({message: 'Service updated successfully'})


    } catch (error) {
        res.status(500).json({message: 'Error updating service', error: error.message});
    }
};

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