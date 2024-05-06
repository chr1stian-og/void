import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import attach from "../assets/images/paperclip.svg";

const sendButton = require("../assets/images/void.png");

const api = axios.create({ baseURL: "http://localhost:3001" });

function Home() {
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState({
    id: 1,
    username: "void",
    email: "",
    password: "",
  });
  const [newPost, setNewPost] = useState({
    category: "Thought",
    content: "",
    userId: user.id,
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    api
      .get(`/api/posts/1`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendNewPost = () => {
    api
      .post("/api/newPost", newPost)
      .then((res) => {
        fetchPosts();
        // Additional alert or actions can go here
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const formatSubmittedTime = (timeString) => {
    const date = new Date(timeString);
    const formattedDate = date.toLocaleDateString(); // Adjust the format as needed
    const formattedTime = date.toLocaleTimeString(); // Adjust the format as needed
    return `${formattedTime}`;
  };

  const handleCategoryChange = (e) => {
    setNewPost({ ...newPost, category: e.target.value });
    document.getElementById("content").value = "";
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendNewPost();
    }
  }

  return (
    <>
      <Navbar />
      <center>
        <div className="flex flex-col m-5 justify-center align-center">
          <div className="fixed top-5 left-0 right-0 flex justify-center">
            <h1 className="text-red font-bold">VOID SOCIAL</h1>
          </div>

          <div className="max-h-[650px] overflow-y-auto flex flex-col justify-center items-center mt-32">
            {posts.length > 0 ? (
              posts
                .slice()
                .reverse()
                .map((post, id) => (
                  <div className="flex flex-col">
                    <div
                      key={id}
                      className="flex flex-row w-[600px] justify-between mb-1"
                    >
                      <h4>@{user.username}</h4>
                      <h4>{post.category}</h4>
                    </div>
                    <div className="flex flex-row mb-2 items-center justify-between gap-10">
                      <h3>{post.content}</h3>
                      <h4>{formatSubmittedTime(post.submitted_time)}</h4>
                    </div>
                    <hr className="w-full border-t-1 border-[#ffffff2c] my-4" />
                  </div>
                ))
            ) : (
              <div>No posts available</div>
            )}
          </div>

          <div className="fixed bottom-0">
            <div className="flex flex-row mx-20 mt-52 justify-center align-center gap-2">
              <select
                className="bg-red-800 px-4 py-2 border-2 rounded-md"
                onChange={handleCategoryChange}
                value={newPost.category}
              >
                <option>Thought</option>
                <option>Memes</option>
                <option>Images</option>
                <option>Finance</option>
                <option>Entertainment</option>
                <option>News</option>
                <option>Sports</option>
              </select>
              <input
                id="content"
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setNewPost({ ...newPost, content: e.target.value });
                }}
                placeholder="Start writing..."
                className="border-white w-[500px] border-2 px-4 py-2 rounded-md"
              />

              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-red-800 rounded-md px-8 bold"
              >
                <div className="flex flex-row gap-4">
                  <img src={attach} width={20} alt="attach" />
                </div>
              </button>

              <button
                onClick={sendNewPost}
                className="bg-red-800 rounded-md px-8 bold"
              >
                <div className="flex flex-row gap-4">
                  <span className="buttonText bold text-sm uppercase">
                    Send
                  </span>
                  <img src={sendButton} width={20} alt="send" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </center>

      <Footer />
    </>
  );
}

export default Home;
