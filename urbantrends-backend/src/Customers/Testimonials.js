import connectDb from "../../config/database.js";
// this file is going to handle mock client data in api format

// add client endpoint
export const addClientsTestimony = async (req, res) => {
    try {
        const database = await connectDb();
        const { client_name, client_image, client_message } = req.body;

        if (!client_name || !client_message) return res.status(400).json({ message: "client name and message required" });

        const [result] = await database.execute('INSERT INTO urbantrends_clients ( client_name, client_image, client_message ) VALUE ( ?, ?, ? )', [client_name, client_image, client_message]);

        res.status(200).json({ message: "Response added", from: result.client_name })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json("Duplicate entries detected")
        }
        console.error("Error adding clients testimonials", error)
        res.status(500).json({ message: "internal server error", error: error.message })
    }
};

// getting clients endpoint
export const getClientsMessage = async (req, res) => {
    try {
        const database = await connectDb();

        const [rows] = await database.execute('SELECT * FROM urbantrends_clients')

        res.status(200).json(rows);
    } catch (err) {
        console.error('error fetching client messages', err)
        res.status(500).json({ message: "server error" })
    }
};

// get client by id
export const getMessageById = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;

        const [rows] = await database.execute('SELECT * FROM urbantrends_clients WHERE id= ?', [id]);

        if (!rows) {
            return res.status(404).json({ message: "Client message not found" });
        }

        res.status(200).json(rows[0])
    } catch (error) {
        console.error('Error getting message id', error)
        res.status(500).json({ message: "internal server error", error: error.message })
    }
};


// delete clientMessage
export const DeleteMessage = async (req, res) => {
    try {

        const database = await connectDb();
        const { id } = req.params;

        const [result] = await database.execute('DELETE FROM urbantrends_clients WHERE id= ?', [id]);

        if (!result) {
            return res.status(404).json({ message: "Client message not found" })
        };

        res.status(200).json({ message: "Message deleted successfully" })

    } catch (error) {
        console.error("Error deleting Client message", error)
        res.status(500).json({ error: error.message })

    }
}

