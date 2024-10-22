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

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL successfully");
  })
  .catch((err) => {
    console.error("Connection error", err.stack);
  });

let manhwaData = [];
let admin_mode = false;
let lastRouteHit = "/"


//GET Home PAge
app.get("/", async (req,res) => {
    let rndr = admin_mode ? "admin.ejs" : "index.ejs";
    lastRouteHit = "/"

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') AND title NOT ILIKE '%hentai%' ORDER BY id ASC;");
        manhwaData = result.rows;

        res.render(rndr , {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Filter by RATING desc
app.get("/filter/rating", async (req,res) => {
    let rndr = admin_mode ? "admin.ejs" : "index.ejs";
    lastRouteHit = "/filter/rating";

    try {
        let result = await db.query("SELECT * FROM manhwalog ORDER BY rating DESC");
        manhwaData = result.rows;

        res.render(rndr, {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }

});

//Filter by ONGOING
app.get("/filter/ongoing", async (req,res) => {
    let rndr = admin_mode ? "admin.ejs" : "index.ejs";
    lastRouteHit = "/filter/ongoing";

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING') ORDER BY id ASC;");
        manhwaData = result.rows;

        res.render(rndr, {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Filter by COMPLETED
app.get("/filter/completed", async (req,res) => {
    let rndr = admin_mode ? "admin.ejs" : "index.ejs";
    lastRouteHit = "/filter/completed";

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('COMPLETED') ORDER BY id ASC;");
        manhwaData = result.rows;

        res.render(rndr, {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Filter by HAITUS
app.get("/filter/haitus", async (req,res) => {
    let rndr = admin_mode ? "admin.ejs" : "index.ejs";
    lastRouteHit = "/filter/haitus"

    try {
        let result = await db.query("SELECT * FROM manhwalog WHERE status IN ('HAITUS') ORDER BY id ASC;");
        manhwaData = result.rows;

        res.render(rndr, {
            data: manhwaData,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error retrieving data");
    }
});

//Search Bar
app.post("/search", async (req,res) => {
    let rndr = admin_mode ? "admin.ejs" : "index.ejs";
    lastRouteHit = "/"
    let searchText = req.body.searchbar;

    if(searchText === '/RKYDASRUDE1'){
        res.render("admin.ejs", {
            data: manhwaData,
        });
    }
    else if(searchText === '/RKYDASRUDE1on'){
        admin_mode = true;
        res.redirect(lastRouteHit);
    }
    else if(searchText === '/RKYDASRUDE1off'){
        admin_mode = false;
        res.redirect(lastRouteHit)
    }
    else{
        try {
            let result = await db.query("SELECT * FROM manhwalog WHERE LOWER(title)LIKE '%' || LOWER($1) || '%';",[searchText]);
            manhwaData = result.rows;
            console.log(manhwaData);
            
    
            res.render(rndr, {
                data: manhwaData,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error retrieving data");
        }
    }

    
});


//post for new manhwa
app.post("/addNew", async (req, res) => {
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
  
    if (readAtURL.trim() === "") {
      readAtURL = "https://asurascanslation.com/manga/" + title.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9\-]+/g, "").replace(/\-+/g, "-").trim();     
      console.log(readAtURL);
    }
  
    if (coverURL.trim() === "") {
      coverURL = "https://asurascanslation.com/wp-content/uploads/covers/" + title.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9\-]+/g, "").replace(/\-+/g, "-").trim() + ".jpg";     
      console.log(coverURL);
    }
  
    try {
      await db.query(
        "INSERT INTO manhwalog (title, last_read, last_ch, rating, status, cover_url, read_at) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [title, lastRead, lastCh, rating, status, coverURL, readAtURL]
      );
  
      const result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;");
      manhwaData = result.rows;
      console.log(manhwaData);
  
      res.redirect(lastRouteHit);
      
    } catch (err) {
      console.error("Error during database operations: ", err.message);
      res.status(500).send("Error adding new manhwa log.");
    }
  });
  

//Edit Existing manhwa
app.post("/edit", async (req,res) => {
    
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
        await db.query(
            "UPDATE manhwalog SET title = $1, last_read = $2, last_ch = $3, rating = $4, status = $5, cover_url = $6, read_at = $7 WHERE id = $8;",
            [title, lastRead, lastCh, rating, status, coverURL, readAtURL, editID]
        );
    }catch(err){
        console.log(err.message);
    }

    try {
    const result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;");
    manhwaData = result.rows;
    console.log(manhwaData);
} catch (err) {
    console.log(err.message);
}
    res.redirect(lastRouteHit);
});

//DELETE Mnahwa
app.post("/delete", async (req,res) => {
    let DELid = Number(req.body.DELid);

    try{
        await db.query("DELETE FROM manhwalog WHERE id = $1",
            [DELid]
        );
    }catch(err){
        console.log(err.message);
    }

    try {
        const result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;");
        manhwaData = result.rows;
        console.log(manhwaData);
    }catch (err) {
        console.log(err.message);
    }
    
    res.redirect(lastRouteHit);
});

//COMPLETE Mnahwa
app.post("/complete", async (req,res) => {
    let COMPid = Number(req.body.COMPid);

    try{
        await db.query("UPDATE manhwalog SET status = 'COMPLETED' WHERE id = $1;",
            [COMPid]
        );
    }catch(err){
        console.log(err.message);
    }

    try {
        const result = await db.query("SELECT * FROM manhwalog WHERE status IN ('ONGOING', 'HAITUS') ORDER BY id ASC;");
        manhwaData = result.rows;
        console.log(manhwaData);
    }catch (err) {
        console.log(err.message);
    }
    
    res.redirect(lastRouteHit)
});


app.listen(port, ()=> {
    console.log(`Manhwa Log at port: ${port}`);
});
