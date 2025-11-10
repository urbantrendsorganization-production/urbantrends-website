import connectDb from "../../config/database.js";
// this file will handle developers projects how to add them 
// and perform crud operations based on the developer

export const addProjects = async (req, res) => {
  try {
    const database = await connectDb();
    const { developer_id, project_name, description, tech_stack, repository_url, live_url, status } = req.body;

    // Check required fields
    if (!developer_id || !project_name || !tech_stack) {
      return res.status(400).json({ message: "Relevant fields are missing" });
    }

    // Check if developer exists
    const [dev] = await database.execute(
      'SELECT id FROM developers_urbantrends WHERE id = ?',
      [developer_id]
    );
    if (dev.length === 0) {
      return res.status(404).json({ message: "Developer not found" });
    }

    // Insert project
    const [result] = await database.execute(
      `INSERT INTO urbantrends_projects 
      (developer_id, project_name, description, tech_stack, repository_url, live_url, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [developer_id, project_name, description, tech_stack, repository_url, live_url, status]
    );

    // Fetch newly added project
    const [newProject] = await database.execute(
      'SELECT * FROM urbantrends_projects WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: "Project added successfully",
      project: newProject[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getProjectsByDeveloper = async (req, res) => {
    try {
        const database = await connectDb();
        const { developer_id } = req.params;

        if (!developer_id || isNaN(developer_id)) {
            return res.status(400).json({ message: "Invalid developer ID" });
        }

        const [rows] = await database.execute(
            'SELECT * FROM urbantrends_projects WHERE developer_id = ? ORDER BY created_at DESC',
            [developer_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No projects found for this developer" });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



// get all projects generally
export const getAllProjects = async (req, res) => {
    try {
        const database = await connectDb();

        const [rows] = await database.execute('SELECT * FROM urbantrends_projects')

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message})
    }
};