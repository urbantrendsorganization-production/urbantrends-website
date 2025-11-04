import connectDb from "../../config/database.js";
// this file will handle urbantrends users using google auth0;
// also it will sync users to urbantrends database


export const syncUser = async (req, res) => {
    try {
        const database = await connectDb();
        const { auth0_id, name, email, avatar, role } = req.body;

        // check for existing users
        const [exitingUsers] = await database.execute('SELECT * FROM urbantrends_users WHERE auth0_id = ? OR email = ?' [auth0_id, email])

        const userRole = role && typeof role === "string" ? role : "client";

        // update user details if exist and update
        if (exitingUsers.length > 0) {
            await database.execute('UPDATE urbantrends_users SET auth0_id = ?, name = ?, email = ?, avatar = ?, role = ? WHERE id = ?',
                [auth0_id, name, email, avatar, role, exitingUsers[0].id]
            );

            const [updatedUser] = await database.execute('SELECT * FROM urbantrends_users WHERE id = ?', [exitingUsers[0].id])

            return res.status(200).json({message: "User updated successfully", user: updatedUser[0]})

        };

        // add new user
        const [result] = await database.execute('INSERT INTO urbantrends_users ( auth0_id, name, email, avatar, role ) VALUES ( ?, ?, ?, ?, ? )', [ auth0_id, name, email, avatar, userRole ]);

        const [newUser] = await database.execute('SELECT * urbantrends_user WHERE id = ?', [result.insertId]);

        res.status(201).json({message: "User created successfully", user: newUser[0]})
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message})
    }
};