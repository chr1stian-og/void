const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");

//GLOBAL VARIABLES
const PORT = 3001;

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  database: "sys",
  password: "Df59c2577#",
  connectionLimit: 10, // Adjust according to your needs
  handshakeTimeout: 30000, // 30 seconds, adjust as needed
});

//Endpoints
app.use(express.json());
app.use(
  cors({
    // origin: ALLOWED_ORIGIN,
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Get Requests
app.get("/api/test", (req, res) => {
  res.status(200).json("API IS WORKING!");
});

app.get("/api/testdb", (req, res) => {
  // Try to connect to the database and execute a simple query
  pool.getConnection((error, connection) => {
    if (error) {
      console.error("Error connecting to database:", error);
      res.status(500).send("Error connecting to database");
    } else {
      connection.query("SELECT 1 + 1 AS result", (queryError, results) => {
        // Release the connection back to the pool
        connection.release();

        if (queryError) {
          console.error("Error executing query:", queryError);
          res.status(500).send("Error executing query");
        } else {
          console.log("Database connection test successful");
          res.status(200).json({ result: results[0].result });
        }
      });
    }
  });
});

app.get("/api/posts", (req, res) => {
  // Retrieve all posts from the database
  const query = "SELECT * FROM posts";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Return the fetched posts
    res.status(200).json(results);
  });
});

//Post Requests
app.post("/api/newPost", (req, res) => {
  const { content, category, userId } = req.body;

  // Insert the new note into the database
  const query =
    "INSERT INTO posts (content, category, user_id) VALUES (?, ?, ?)";

  pool.query(query, [content, category, userId], (err, results) => {
    if (err) {
      console.error("Error publishing a new post:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // Return the ID of the newly created note
    res
      .status(201)
      .json({ id: results.insertId, message: "Post published successfully" });
  });
});

app.post("/api/likePost", (req, res) => {
  const { userId, postId } = req.body;

  // Check if the user has already liked the post
  pool.query(
    "SELECT * FROM  WHERE user_id = ? AND post_id = ?",
    [userId, postId],
    (err, results) => {
      if (err) {
        console.error("Error checking if user liked post:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "User already liked this post" });
      }

      // User hasn't liked the post yet, proceed with liking the post
      pool.query(
        "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
        [userId, postId],
        (err) => {
          if (err) {
            console.error("Error liking post:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.status(200).json({ message: "Post liked successfully" });
        }
      );
    }
  );
});

app.post("/api/signin", (req, res) => {
  // const Name = "Void";
  // const username = "void";
  // const email = "void@void.com";
  // const password = "void";
  const { username, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Insert the new user into the database
    const insertQuery =
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    pool.query(
      insertQuery,

      [username, email, hashedPassword],
      (insertErr, results) => {
        if (insertErr) {
          console.error("Error creating a new user:", insertErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
    res.status(200).json({ message: "User created successfully" });
  });
});

//starting listener
try {
  app.listen(PORT, () => console.log(`Backend on port ${PORT}...`));
} catch (e) {
  LOGGER.error(
    "An error ocurred with the server. Read the error log for more details.",
    e.message
  );
}
