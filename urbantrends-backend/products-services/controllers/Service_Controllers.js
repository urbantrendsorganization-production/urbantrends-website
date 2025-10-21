import connectDb from "../../config/db.js";

// this file will handle all the services urbantrends offers, and a gateway to access them

// create a service
export const createService = async (req, res) => {
    try {
        const database = await connectDb();
        const { name, description, tech_stack, price } = req.body;

        if (!name || !description || !tech_stack || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [result] = await database.execute(
            'INSERT INTO services_showcase (name, description, tech_stack, price) VALUES (?, ?, ?, ?)',
            [name, description, tech_stack, price]
        );

        res.status(201).json({ message: 'Service created successfully', serviceId: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Service with this description already exists' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// get all services
export const getAllServices = async (req, res) => {
    try {
        const database = await connectDb();
        const [services] = await database.execute('SELECT * FROM services_showcase');
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// get a single service by id
export const getServiceById = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;
        const [services] = await database.execute('SELECT * FROM services_showcase WHERE id = ?', [id]);

        if (services.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ service: services[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// update a service by id
export const updateServiceById = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;
        const { name, description, tech_stack, price } = req.body;

        const [result] = await database.execute(
            'UPDATE services_showcase SET name = ?, description = ?, tech_stack = ?, price = ? WHERE id = ?',
            [name, description, tech_stack, price, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// delete a service by id
export const deleteServiceById = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;

        const [result] = await database.execute('DELETE FROM services_showcase WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
