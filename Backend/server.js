import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import db from "./database.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: [process.env.FRONTEND_CLIENT_URL],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
);

// app.options('*', cors());


app.get("/api/comics", async (req, res) => {

    try {
        let result = await db.query("SELECT * FROM manhwalog ORDER BY id ASC;");
        res.status(200).json(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

app.post("/api/addNew", async (req, res) => {
    console.log(req.body);
    const data = req.body;

    try {
        const result = await db.query(
            "INSERT INTO manhwalog (title, cover_url, read_at, last_ch, status, last_read) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [data.title, data.cover_url, data.read_at, data.last_ch, data.status, data.last_read] // safe values (prevents SQL injection)
        );

        console.log("Inserted:", result.rows[0]);

        res.status(200).json({ message: "Added successful", addedComic: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "Database error while inserting data" });
        console.log(err.message);
    }
})

app.patch("/api/update/:id", async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const fields = Object.keys(changes);
        const values = Object.values(changes);

        if (fields.length === 0) {
            console.log("No changes");
            return res.status(400).json({ error: "No changes provided" });
        }

        const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");

        values.push(id);

        const query = `UPDATE manhwalog SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;

        const result = await db.query(query, values);

        console.log(result.rows[0]);


        res.status(200).json({ message: "Update successful", updatedComic: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database update failed" });
    }
});


app.delete("/api/delete/:id", async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;

    try {
        await db.query("DELETE FROM manhwalog WHERE id = $1;", [id]);

        res.status(200).json({ message: "Deleted successful" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database operation Delete failed" });

    }
});

//* Start the server
app.listen(PORT, () => {
    console.log(`Server running at PORT:${PORT}`);
});