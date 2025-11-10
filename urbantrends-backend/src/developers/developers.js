import connectDb from "../../config/database.js";
// this file is going to handle urbantrends developers team.
// also it will contain essential CRUD operations

export const addDeveloper = async (req, res) => {
    try {
        const database = await connectDb();
        const { auth0_id, github_username, email, name, avatar_url } = req.body;

        // check for existing developer
        const [existingDeveloper] = await database.execute(
            'SELECT * FROM developers_urbantrends WHERE auth0_id = ? OR email = ?',
            [auth0_id, email]
        );

        if (existingDeveloper.length > 0) {
            // update user details
            await database.execute(
                'UPDATE developers_urbantrends SET auth0_id = ?, github_username = ?, email = ?, name = ?, avatar_url = ? WHERE id = ?',
                [auth0_id, github_username, email, name, avatar_url, existingDeveloper[0].id]
            );

            const [updatedDeveloper] = await database.execute(
                'SELECT * FROM developers_urbantrends WHERE id = ?',
                [existingDeveloper[0].id]
            );

            return res.status(200).json({
                message: "Developer updated successfully",
                developer: updatedDeveloper[0]
            });
        }

        // add new developer
        const [developer] = await database.execute(
            'INSERT INTO developers_urbantrends (auth0_id, github_username, email, name, avatar_url) VALUES (?, ?, ?, ?, ?)',
            [auth0_id, github_username, email, name, avatar_url]
        );

        const [newDeveloper] = await database.execute(
            'SELECT * FROM developers_urbantrends WHERE id = ?',
            [developer.insertId]
        );

        res.status(201).json({
            message: "Developer added successfully",
            developer: newDeveloper[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error", error: error.message });
    }
};


// get all developers
export const getAllDevelopers = async (req, res) => {
    try {
        const database = await connectDb();

        const [result] = await database.execute('SELECT * FROM developers_urbantrends');

        res.status(200).json({message: "Developers fetched successfully", developers: result})
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message})
    }
};