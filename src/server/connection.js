const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

//GLOBAL VARIABLES
const PORT = 3001;

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  database: "sys",
  password: "Df59c2577#",
  connectionLimit: 10,
  handshakeTimeout: 30000,
});

//Configurations
app.use(express.json());
app.use(express.json({ limit: "5025mb0mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));

//Endpoints

app.get("/api/test", (req, res) => {
  res.status(200).json("API IS WORKING!");
});

app.get("/api/testdb", (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.error("Error connecting to database:", error);
      res.status(500).send("Error connecting to database");
    } else {
      connection.query("SELECT 1 + 1 AS result", (queryError, results) => {
        connection.release();

        if (queryError) {
          console.error("Error executing query:", queryError);
          res.status(500).send("Error executing query");
        } else {
          console.log("Database connection test successful");
          res.status(200).json({
            message: "Database connection test successful",
            result: results[0].result,
          });
        }
      });
    }
  });
});

app.get("/api/posts", (req, res) => {
  const query =
    "SELECT posts.*, user.username FROM posts JOIN user ON posts.user_id = user.id";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results);
  });
});

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/api/newPost", upload.single("image"), (req, res) => {
  const { content, category, userId, username } = req.body;
  const image = req.file ? req.file.path : null; 
    const query =
    "INSERT INTO posts (content, category, user_id, username, image) VALUES (?, ?, ?, ?, ?)";

  pool.query(
    query,
    [content, category, userId, username, image],
    (err, results) => {
      if (err) {
        console.error("Error publishing a new post:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res
        .status(201)
        .json({ id: results.insertId, message: "Post published successfully" });
    }
  );
});

app.post("/api/deletePost", (req, res) => {
  const postId = req.body.postId;

  const deleteQuery = "DELETE FROM posts WHERE id = ?";
  pool.query(deleteQuery, [postId], (err, results) => {
    if (err) {
      console.error("Error deleting Post:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  });
});

app.post("/api/getLikedPosts", (req, res) => {
  const userId = req.body.userId;
  pool.query(
    "SELECT * FROM likes WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching liked posts:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json(results);
    }
  );
});

app.get("/api/images", (req, res) => {
  pool.query("SELECT image FROM posts", (err, results) => {
    if (err) {
      console.error("Error fetching liked posts:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
});

app.post("/api/likePost", (req, res) => {
  const { userId, postId } = req.body;

  // Check if the user has already liked the post
  pool.query(
    "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
    [userId, postId],
    (err, results) => {
      if (err) {
        console.error("Error checking if user liked post:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        // User already liked the post, removing the like
        pool.query(
          "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
          [userId, postId],
          (err) => {
            if (err) {
              console.error("Error removing like from post:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({ message: "Like removed successfully" });
          }
        );
      } else {
        // User hasn't liked the post yet, liking the post
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
    }
  );
});

app.post("/api/editPost", (req, res) => {
  const { content, id } = req.body;

  const query = "UPDATE notes SET content = ? WHERE id = ?";
  pool.query(query, [content, noteId], (err, results) => {
    if (err) {
      console.error("Error updating note:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "Note updated successfully" });
  });
});

app.post("/api/signin", (req, res) => {
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

        // Send the response only after the user is successfully inserted
        res.status(200).json({ message: "User created successfully" });
      }
    );
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Retrieve user information based on the provided email
  const query = "SELECT id, username, password FROM user WHERE username = ?";
  pool.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Check if the user exists
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password from the database
    let user = results[0];
    bcrypt.compare(password, user.password, (bcryptErr, passwordMatch) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Successful login
    });
    return res.status(200).json({
      username: user.username,
      email: user.email,
      id: user.id,
      message: "Loggin successfully",
    });
  });
});

//starting listener
try {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}...`));
} catch (e) {
  LOGGER.error(
    "An error ocurred with the server. Read the error log for more details.",
    e.message
  );
}
