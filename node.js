import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL, // Set this in Render's environment variables section
  ssl: {
    rejectUnauthorized: false, // For secure connections in hosted environments like Render
  },
});

// Connect to the PostgreSQL database
db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL successfully");

    db.query(
      `CREATE TABLE IF NOT EXISTS manhwalog (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        last_read VARCHAR(10) NOT NULL,
        last_ch INT NOT NULL,
        rating DECIMAL(3, 1),
        status VARCHAR(20) NOT NULL CHECK (status IN ('ONGOING', 'COMPLETED', 'HAITUS')),
        cover_url TEXT NOT NULL
      );`
    );
  })
  .catch((err) => {
    console.error("Connection error", err.stack);
  });


let manhwaData = [];



//GET Home PAge
app.get("/", async (req,res) => {

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;");
        manhwaData = result.rows;

        res.render("index.ejs", {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Filter by RATING desc
app.get("/filter/rating", async (req,res) => {

    try {
        let result = await db.query("SELECT * FROM manhwalog ORDER BY rating DESC")
        manhwaData = result.rows;

        res.render("index.ejs", {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }

});

//Filter by ONGOING
app.get("/filter/ongoing", async (req,res) => {

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING') ORDER BY id ASC;")
        manhwaData = result.rows;

        res.render("index.ejs", {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Filter by COMPLETED
app.get("/filter/completed", async (req,res) => {

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('COMPLETED') ORDER BY id ASC;")
        manhwaData = result.rows;

        res.render("index.ejs", {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Filter by HAITUS
app.get("/filter/haitus", async (req,res) => {

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('HAITUS') ORDER BY id ASC;")
        manhwaData = result.rows;

        res.render("index.ejs", {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Search Bar
app.post("/search", async (req,res) => {
    let searchText = req.body.searchbar;

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE LOWER(title)LIKE '%' || LOWER($1) || '%';",[searchText]);
        manhwaData = result.rows;
        console.log(manhwaData);
        

        res.render("index.ejs", {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});


//post for new manhwa
app.post("/addNew", (req,res) => {
    let title = req.body.title;
    let lastRead = new Date().toLocaleDateString("en-US", { 
        month: "short",  // "Oct" for October
        day: "numeric"   // "14" for the day
    });
    let lastCh = req.body.Lchapter;
    let rating = req.body.rating;
    let status = req.body.status;
    let coverURL = req.body.cover;
    let readAtURL = req.body.readAt;

    if(readAtURL.trim() == ""){
        readAtURL = "https://asurascanslation.com/manga/"+title.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9\-]+/g, "").replace(/\-+/g, "-").trim();     
        console.log(readAtURL);
    }
    if(coverURL .trim() == "")
        // seoul-station-necromancer
        coverURL = "https://asurascanslation.com/wp-content/uploads/covers/"+title.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9\-]+/g, "").replace(/\-+/g, "-").trim()+".jpg";     
        console.log(readAtURL);
    try{
        db.query(
            "INSERT INTO manhwalog (title, last_read, last_ch, rating, status, cover_url, read_at) VALUES ($1, $2, $3, $4, $5, $6, $7);",
            [title, lastRead, lastCh, rating, status, coverURL, readAtURL]
        );
    }catch(err){
        console.log(err.message);
    }

    try{
        db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;", (err, res) => {
            manhwaData = res.rows;
            console.log(manhwaData);
        });
    }catch(err){
        console.log(err.message);
    }
   
    res.redirect("/")
});

//Edit Existing manhwa
app.post("/edit", (req,res) => {
    
    let editID = req.body.manhwaID;
    let title = req.body.Etitle;
    let lastCh = req.body.ELchapter;
    let rating = req.body.Erating;
    let status = req.body.Estatus;
    let coverURL = req.body.Ecover;
    let readAtURL = req.body.EreadAt;
    
    let manhwaToEdit = manhwaData.find(manhwa => manhwa.id == editID);
    let DBchCompare = manhwaToEdit?.last_ch || null; 
    let lastRead = manhwaToEdit?.last_read; 

    if (lastCh > Number(DBchCompare)) {
        lastRead = new Date().toLocaleDateString("en-US", { 
            month: "short",  // "Oct" for October
            day: "numeric"   // "14" for the day
        }); 
    }    

    try{
        db.query(
            "UPDATE manhwalog SET title = $1, last_read = $2, last_ch = $3, rating = $4, status = $5, cover_url = $6, read_at = $7 WHERE id = $8;",
            [title, lastRead, lastCh, rating, status, coverURL, readAtURL, editID]
        );
    }catch(err){
        console.log(err.message);
    }

    try{
        db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;", (err, res) => {
            manhwaData = res.rows;
            console.log(manhwaData);
        });
    }catch(err){
        console.log(err.message);
    }

    res.redirect("/");
});

//DELETE Mnahwa
app.post("/delete", (req,res) => {
    let DELid = Number(req.body.DELid);

    try{
        db.query("DELETE FROM manhwalog WHERE id = $1",
            [DELid]
        );
    }catch(err){
        console.log(err.message);
    }

    try{
        db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;", (err, res) => {
            manhwaData = res.rows;
            console.log(manhwaData);
        });
    }catch(err){
        console.log(err.message);
    }
    
    res.redirect("/")
});

//COMPLETE Mnahwa
app.post("/complete", (req,res) => {
    let COMPid = Number(req.body.COMPid);

    try{
        db.query("UPDATE manhwalog SET status = 'COMPLETED' WHERE id = $1;",
            [COMPid]
        );
    }catch(err){
        console.log(err.message);
    }

    try{
        db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;", (err, res) => {
            manhwaData = res.rows;
            console.log(manhwaData);
        });
    }catch(err){
        console.log(err.message);
    }
    
    res.redirect("/")
});


app.listen(port, ()=> {
    console.log(`Manhwa Log at port: ${port}`);
});
